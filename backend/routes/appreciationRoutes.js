const express = require('express');
const router = express.Router();
const Appreciation = require('../models/appreciation');

// Get all appreciations
router.get('/fetchAll', async (req, res) => {
    try {
        const appreciations = await Appreciation.find();
        res.status(200).json(appreciations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new appreciation
router.post('/create', async (req, res) => {
    const { fromUser, toUser, title, description } = req.body;

    if (!fromUser || !toUser || !title || !description) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const appreciation = new Appreciation({ fromUser, toUser, title, description });
        await appreciation.save();
        res.status(201).json(appreciation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit an appreciation
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const appreciation = await Appreciation.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!appreciation) {
            return res.status(404).json({ error: 'Appreciation not found.' });
        }
        res.status(200).json(appreciation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
