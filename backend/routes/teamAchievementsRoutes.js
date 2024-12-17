const express = require('express');
const router = express.Router();
const TeamAchievement = require('../models/teamAchievement');

// Get all team achievements
router.get('/fetchAll', async (req, res) => {
    try {
        const achievements = await TeamAchievement.find();
        res.status(200).json(achievements);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new team achievement
router.post('/create', async (req, res) => {
    const { teamName, title, description, createdBy } = req.body;

    if (!teamName || !title || !description || !createdBy) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const achievement = new TeamAchievement({ teamName, title, description, createdBy });
        await achievement.save();
        res.status(201).json(achievement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit a team achievement
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const achievement = await TeamAchievement.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );
        if (!achievement) {
            return res.status(404).json({ error: 'Achievement not found.' });
        }
        res.status(200).json(achievement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a team achievement
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await TeamAchievement.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'Achievement not found.' });
        }
        res.status(200).json({ message: 'Achievement deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
