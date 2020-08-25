require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth');
const channelsRouter = require('./routes/channels')

const app = express()
const port = 5000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/auth', authRouter)
app.use('/channels', channelsRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})