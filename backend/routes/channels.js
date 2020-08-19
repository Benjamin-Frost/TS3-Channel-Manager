const router = require('express').Router()
const { ts3Query } = require('../utils/ts3')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

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

router.get('/', (req, res) => {
    res.send(`You made it! Logged in with TS UID ${req.tsUid}`)
})

module.exports = router;