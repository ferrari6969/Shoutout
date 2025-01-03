const mongoose = require('mongoose');

const teamPartySchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TeamParty', teamPartySchema);
