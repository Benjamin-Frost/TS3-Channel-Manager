require('dotenv').config()

const { TeamSpeak } = require("ts3-nodejs-library")

const ts3Query = new TeamSpeak({
    host: "localhost",
    serverport: 9987,
    username: "serveradmin",
    password: process.env.SQ_PW,
    nickname: "TS3 Channel Manager"
})

ts3Query.on("ready", () => {
    console.log('Connected to TS3 Server')
})

ts3Query.on("error", () => {
    console.error('Error occured when trying to connect to TS3 Server')
})

// Connection lost => Try to reconnect...
ts3Query.on("close", async () => {
    console.log("Connection to TS3 Server lost! Trying to reconnect...")
    await ts3Query.reconnect(-1, 5000) // Retry every 5 seconds
})

module.exports = { ts3Query }