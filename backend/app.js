require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const loginRouter = require('./routes//login');

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/login', loginRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})