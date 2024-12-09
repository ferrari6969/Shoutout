const mongoose = require('mongoose');

const workAnniversarySchema = new mongoose.Schema({
    waId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfJoining: { type: Date, required: true },
    comments: [
        {
            content: { type: String, required: true },
            author: { type: String },
            date: { type: Date, default: Date.now } 
        }
    ]
});

module.exports = mongoose.model('WorkAnniversary', workAnniversarySchema);
