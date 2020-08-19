const mongoose = require('mongoose');

const authUserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    key: {type: String, required: true }
}, {
    timestamps: true
});

const AuthUser = mongoose.model('auth_user', authUserSchema);

module.exports = AuthUser;