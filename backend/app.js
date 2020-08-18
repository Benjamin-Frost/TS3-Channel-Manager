require('dotenv').config()

const express = require('express')
const { ts3Query } = require('./ts-utils')
const crypto = require('crypto')
const mongoose = require('mongoose')

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/login', (req, res) => {
  const tsUid = req.body.tsUid
  const authKey = req.body.authKey
  // Check if the request contains the Teamspeak UID and the auth key
  if (!tsUid || !authKey) {
    res.status(400).send('Please provide your Teamspeak UID and Auth Key')
    return
  }

  // Get Auth Key From DB

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
    var authThoken = crypto.randomBytes(8).toString('hex')
    client.message((`Your auth key: ${authThoken}`))

    // Store auth key in DB

    res.status(200).send('Successfully send auth token to Client')
  }
  catch (err) {
    console.log(err)
    res.status(500).send('An error occured when trying to get client/ send auth token')
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})