const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    dateOfJoining: { type: Date, required: true },
    avatarId:{ type: String},
    isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
