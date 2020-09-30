const { config } = require('../utils/config')
const router = require('express').Router()
const { ts3Query } = require('../utils/ts3')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Channel = require('../models/channel')

router.use((req, res, next) => {
    // JWT Authorisation
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tsUid) => {
        if (err)
            return res.sendStatus(403)

        req.tsUid = tsUid
        next()
    })
})

router.get('/', async (req, res) => {
    // Find all channels created by authorized user
    const channels = await Channel.find(
        { owner_uid: req.tsUid },
        'channel_num channel_name',
        { sort: { 'channel_num': 'asc' } }
    ).exec()

    res.status(200).json(channels)
})

router.get('/:id', async (req, res) => {
    const channel = await Channel.find(
        { _id: req.params.id },
        'channel_id channel_num channel_name owner_uid'
    ).exec()

    res.status(200).json(channel)
})

router.post('/create', async (req, res) => {
    const cName = req.body.channelName
    const cPassword = req.body.channelPassword

    if (!cName || !cPassword)
        return res.status(400).send('Please provide a channel name and password')

    // Check if user reached channel limit
    try {
        const channel_amount = await Channel.countDocuments({ owner_uid: req.tsUid }).exec()

        if (channel_amount > config.maxChannelsPerUser)
            return res.status(403).send('You reached the maximum allowed amount of channels')
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('An error occured when trying to access DB')
    }

    // Calculate Channel Num and Parent ID
    let cNum = 0;
    let parentId = 0;
    try {
        const channels = await Channel.find(
            {},
            'channel_id channel_num -_id',
            { sort: { 'channel_num': 'asc' } }
        ).exec()

        for (; cNum < channels.length; ++cNum) {
            if (channels[cNum].channel_num != cNum)
                break
            parentId = channels[cNum].channel_id
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('An Error occured when calculating channel number.')
    }

    try {
        // Create channel on TS3 Server
        const ts3Channel = await ts3Query.channelCreate(`[${cNum}] ${cName}`, {
            channelPassword: cPassword,
            channelFlagPermanent: true,
            cpid: config.rootChannelId,
            channelOrder: parentId // ID of previous channel
        })

        // Store Chnanel in DB
        const dbChannel = new Channel({
            channel_id: ts3Channel.cid,
            channel_num: cNum,
            channel_name: cName,
            owner_uid: req.tsUid
        })

        await dbChannel.save()
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('An error occured when trying to create channel')
    }

    res.send('Successfully created Channel')
})

router.delete('/:id', async (req, res) => {
    // Check if Channel with requested ID exists and user is Channel owner
    const validateObj = await validateChannelAndOwner(req.params.id, req.tsUid)
    if (validateObj.error)
        return res.status(validateObj.code).send(validateObj.message)

    try {
        // Delete Channel from Teamspeak Server
        const tsDelete = ts3Query.channelDelete(validateObj.channel.channel_id, true)

        // Delete Database Entry
        const dbDelete = validateObj.channel.deleteOne()

        // We called both in parallel (no 'await') => Therefore wait until both have finished
        await Promise.all([tsDelete, dbDelete])
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('An error occured when trying to delete channel')
    }

    res.send('Channel was deleted successfully')
})

router.patch('/:id', async (req, res) => {
    // Check if a new channel name and/or password was requested
    const cName = req.body.channelName
    const cPassword = req.body.channelPassword

    if (!cName && !cPassword)
        return res.status(400).send('Please provide a new channel name and/or a new password')

    // Check if Channel with requested ID exists and user is Channel owner
    const validateObj = await validateChannelAndOwner(req.params.id, req.tsUid)
    if (validateObj.error)
        return res.status(validateObj.code).send(validateObj.message)

    // Update channel information
    let newChannelProps = {}

    if (cPassword) {
        newChannelProps["channelPassword"] = cPassword
    }

    if (cName) {
        newChannelProps["channelName"] = `[${validateObj.channel.channel_num}] ${cName}`
    }

    try {
        let allPromises = []
        // Update Channel on TS3 Server
        const tsPatch = ts3Query.channelEdit(validateObj.channel.channel_id, newChannelProps)
        allPromises.push(tsPatch)

        // Update Channel in Database
        if (cName) {
            validateObj.channel.channel_name = cName
            const dbPatch = validateObj.channel.save()
            allPromises.push(dbPatch)
        }

        // We called both in parallel (no 'await') => Therefore wait until both have finished
        await Promise.all(allPromises)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('An error occured when trying to patch channel')
    }

    res.send('Channel was updated successfully')
})

async function validateChannelAndOwner(dbId, tsUid) {
    // Check if passed id is a valid mongoDB ID
    if (!mongoose.Types.ObjectId.isValid(dbId)) {
        return { error: true, code: 400, message: 'The passed ID is invalid' }
    }

    // Get Owner UID and Channel ID from Database
    let channel;
    try {
        channel = await Channel.findOne(
            { _id: dbId },
            'channel_id channel_num owner_uid'
        ).exec()
    }
    catch (err) {
        console.log(err)
        return { error: true, code: 500, message: 'An error occured when trying to access database' }
    }

    // Check if a channel with that ID exists
    if (!channel) {
        return { error: true, code: 404, message: 'Could not find a channel with the requested ID' }
    }

    // Make sure the request was made by the channel owner
    if (channel.owner_uid != tsUid) {
        return { error: true, code: 403, message: 'You cannot edit a channel that does not belong to you' }
    }

    return { error: false, channel: channel }
}

module.exports = router;
