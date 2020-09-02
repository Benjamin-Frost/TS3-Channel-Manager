const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    channel_id: { type: Number, required: true }, // The Channel ID asigned by Teamspeak Server
    channel_num: { type: Number, required: true }, // The calculated Channel Number (Defining Order + Name)
    channel_name: { type: String, required: true },
    owner_uid: { type: String, required: true }
}, {
    timestamps: true
});

const Channel = mongoose.model('channel', channelSchema);

module.exports = Channel;