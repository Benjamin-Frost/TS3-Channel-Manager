require('dotenv').config()
const { config } = require('./utils/config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth');
const channelsRouter = require('./routes/channels')

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/auth', authRouter)
app.use('/channels', channelsRouter)
app.listen(config.expressPort, () => {
  console.log(`Server listening at http://localhost:${config.expressPort}`)
})