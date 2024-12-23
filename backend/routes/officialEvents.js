const express = require('express');
const router = express.Router();
const OfficialEvent = require('../models/officialEvent');

// Fetch all official events
router.get('/fetchAll', async (req, res) => {
    try {
        const events = await OfficialEvent.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new official event
router.post('/create', async (req, res) => {
    const { teamName, title, description, createdBy } = req.body;

    if (!teamName || !title || !description || !createdBy) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const event = new OfficialEvent({ teamName, title, description, createdBy });
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit an official event
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const event = await OfficialEvent.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );
        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an official event
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await OfficialEvent.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
