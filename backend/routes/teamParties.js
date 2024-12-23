const express = require('express');
const router = express.Router();
const TeamParty = require('../models/teamParty');

// Fetch all team parties
router.get('/fetchAll', async (req, res) => {
    try {
        const parties = await TeamParty.find();
        res.status(200).json(parties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new team party
router.post('/create', async (req, res) => {
    const { teamName, title, description, createdBy } = req.body;

    if (!teamName || !title || !description || !createdBy) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const party = new TeamParty({ teamName, title, description, createdBy });
        await party.save();
        res.status(201).json(party);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit a team party
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const party = await TeamParty.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );
        if (!party) {
            return res.status(404).json({ error: 'Party not found.' });
        }
        res.status(200).json(party);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a team party
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await TeamParty.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'Party not found.' });
        }
        res.status(200).json({ message: 'Party deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
