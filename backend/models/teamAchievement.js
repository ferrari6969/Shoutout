const mongoose = require('mongoose');

const teamAchievementSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true }, // User who created the achievement
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TeamAchievement', teamAchievementSchema);
