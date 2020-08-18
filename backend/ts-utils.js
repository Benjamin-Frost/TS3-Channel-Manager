const { TeamSpeak } = require("ts3-nodejs-library")

const ts3Query = new TeamSpeak({
    host: "localhost",
    serverport: 9987,
    username: "serveradmin",
    password: "lgWdfXH4",
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