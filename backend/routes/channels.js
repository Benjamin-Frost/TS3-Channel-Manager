const config = require('../utils/config').config
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
    const channels = await Channel.find({ owner_uid: req.tsUid }).exec()

    res.status(200).json(channels)
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
            return res.send('You reached the maximum allowed amount of channels')
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('An error occured when trying to access DB')
    }

    // Create new Channel
    try {
        const channels = await Channel.find(
            {},
            'channel_id channel_num -_id',
            { sort: { 'channel_num': 'asc' } }
        ).exec()

        // Calculte channel num
        let cNum = 0
        let parentId = 0
        for (; cNum < channels.length; ++cNum) {
            if (channels[cNum].channel_num != cNum)
                break
                parentId = channels[cNum].channel_id
        }

        const ts3Channel = await ts3Query.channelCreate(`[${cNum}] ${cName}`, {
            channelPassword: cPassword,
            channelFlagPermanent: true,
            cpid: config.rootChannelId,
            channelOrder: parentId // ID of previous channel
        })

        // Store channel in database
        const dbChannel = new Channel({
            channel_id: ts3Channel.cid,
            channel_num: cNum,
            channel_name: cName,
            owner_uid: req.tsUid
        })
        await dbChannel.save()

        res.send(`Successfully created Channel with number ${dbChannel.channel_num}`)
    }
    catch (err) {
        console.log(err)
        return res.status(400).send('An Error occured when creating the channel')
    }
})

module.exports = router;