require('dotenv').config()

const { TeamSpeak } = require("ts3-nodejs-library")

const ts3Query = new TeamSpeak({
    host: "teamspeak",
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
    process.exit(1)
})

module.exports = { ts3Query }