const mongoose = require('mongoose');

const appreciationSchema = new mongoose.Schema({
    fromUser: { type: String, required: true }, // User ID of the sender
    toUser: { type: String, required: true }, // User ID of the receiver
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appreciation', appreciationSchema);
