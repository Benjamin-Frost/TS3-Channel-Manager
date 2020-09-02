const config = {
    expressPort: 5000, // Port of Express Server
    rootChannelId: 3, // ID of root Channel
    maxChannelsPerUser: 20, // Amount of Channels a single user should be able to create
    authKeyLifetime: 30 // Time in minutes until an auth key expires
}

module.exports = { config }