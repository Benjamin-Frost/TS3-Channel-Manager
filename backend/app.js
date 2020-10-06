// Configs + Utility
require('dotenv').config()
const { config } = require('./utils/config')
const logSymbols = require('log-symbols');

// Express + MongoDB
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// Routes
const authRouter = require('./routes/auth');
const channelsRouter = require('./routes/channels')

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log(logSymbols.success, '[server] Connected to Database');
});

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/auth', authRouter)
app.use('/channels', channelsRouter)
app.listen(config.expressPort, () => {
  console.log(logSymbols.info, `[server] Server listening on port ${config.expressPort}`)
})
