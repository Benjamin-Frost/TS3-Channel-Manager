const { config } = require('../utils/config')
const router = require('express').Router()
const { ts3Query } = require('../utils/ts3')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const AuthUser = require('../models/auth-user')

router.post('/', async (req, res) => {
    const tsUid = req.body.tsUid
    const authKey = req.body.authKey
    // Check if the request contains the Teamspeak UID and the auth key
    if (!tsUid || !authKey) {
        return res.status(400).send('Please provide your Teamspeak UID and Auth Key')
    }

    // Check if we can find a DB Entry with that UID
    try {
        const user = await AuthUser.findOne({ uid: tsUid }).exec()

        // Check if Auth Keys are equal
        if (authKey != user.key)
            return res.status(400).send('Your Auth Key is wrong')

        // Check if Auth Key has expired
        if ((new Date() - user.updatedAt) > config.authKeyLifetime * 60000) // Lifetime in min * (60s * 10000ms)
            return res.status(400).send('Your auth key expired! Please request a new one.')

        // Login done => authenticate user
        const accessToken = jwt.sign(tsUid, process.env.ACCESS_TOKEN_SECRET)

        res.status(200).json({
            'message': 'Authentication successful',
            'accessToken': accessToken
        })

    }
    catch (err) {
        console.error(err)
        res.status(500).send('An error occured when trying to login')
    }
})

router.post('/key', async (req, res) => {
    const tsUid = req.body.tsUid
    // Check if the request contains the Teamspeak UID
    if (!tsUid)
        return res.status(400).send('Please provide your Teamspeak UID')

    try {
        // We want to find the client first
        const client = await ts3Query.getClientByUid(tsUid)

        if (!client)
            return res.status(400).send('Could not find Client with that UID')

        // Generate random auth key and send it to client
        var authkey = crypto.randomBytes(8).toString('hex')
        client.message((`Your auth key: ${authKey}`))

        // Check if DB Entry with that UID exists
        const oldUser = await AuthUser.findOne({ uid: tsUid }).exec()

        if (oldUser) {
            oldUser.key = authkey
            await oldUser.save()
        }
        else {
            const authUser = new AuthUser({ uid: tsUid, key: authkey })
            await authUser.save()
        }

        res.status(200).send('Successfully sent auth key to Client')
    }
    catch (err) {
        console.log(err)
        res.status(500).send('An error occured when trying to send auth key to Client')
    }
})

module.exports = router;