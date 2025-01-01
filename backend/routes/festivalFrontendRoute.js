const express = require('express');
const router = express.Router();
const FestivalShowcase = require('../models/festival');

// GET: Today's festival
router.get('/today', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(5, 30, 0, 0); 
        console.log(today)
        const todayFestival = await FestivalShowcase.findOne({ date: today });
        if (!todayFestival) return res.status(404).json({ message: 'No festival today!' });

        res.status(200).json(todayFestival);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Past festivals
router.get('/past', async (req, res) => {
    try {
        const pastFestivals = await FestivalShowcase.find({ isPast: true }).sort({ date: -1 });
        res.status(200).json(pastFestivals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;