require('dotenv').config()

const express = require('express')
const { ts3Query } = require('./ts-utils')
const crypto = require('crypto')

const mongoose = require('mongoose')
const AuthUser = require('./models/auth-user')

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/login', async (req, res) => {
  const tsUid = req.body.tsUid
  const authKey = req.body.authKey
  // Check if the request contains the Teamspeak UID and the auth key
  if (!tsUid || !authKey) {
    res.status(400).send('Please provide your Teamspeak UID and Auth Key')
    return
  }

  // Check if we can find a DB Entry with that UID
  try {
    const user = await AuthUser.findOne({ uid: tsUid })

    // Check if Auth Keys are equal
    if (authKey != user.key) {
      res.status(400).send('Your Auth Key is wrong')
    }

    // Check if Auth Key is newer than 30 mins
    if((new Date() - user.updatedAt) > 1800000) { // 30 min = 30*60*1000 = 1800000
      res.status(400).send('Your auth key is too old! Please request a new one.')
      return
    }

    // Authentication done => Authorize user
    res.status(200).send('Authentication successful')

  }
  catch (err) {
    console.error(err)
    res.status(500).send('An error occured when trying to login')
  }
})

app.post('/login/key', async (req, res) => {
  const tsUid = req.body.tsUid
  // Check if the request contains the Teamspeak UID
  if (!tsUid) {
    res.status(400).send('Please provide your Teamspeak UID')
    return
  }

  try {
    // We want to find the client first
    const client = await ts3Query.getClientByUid(tsUid)

    if (!client) {
      res.status(400).send('Could not find Client with that UID')
      return
    }

    // Generate random auth key and send it to client
    var authToken = crypto.randomBytes(8).toString('hex')
    client.message((`Your auth key: ${authToken}`))

    // Check if DB Entry with that UID exists
    const oldUser = await AuthUser.findOne({ uid: tsUid })

    if (oldUser) {
      oldUser.key = authToken
      await oldUser.save()
    }
    else {
      const authUser = new AuthUser({ uid: tsUid, key: authToken })
      await authUser.save()
    }

    res.status(200).send('Successfully send auth token to Client')
  }
  catch (err) {
    console.log(err)
    res.status(500).send('An error occured when trying to send auth token to client')
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})