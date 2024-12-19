const express = require('express');
const router = express.Router();
const FestivalList = require('../models/festivalListing');

// POST: Add a new festival listing
router.post('/listings', async (req, res) => {
    try {
        const { listingId, name, month, day, videoId } = req.body;

        const newListing = await FestivalList.create({
            listingId,
            name,
            month,
            day,
            videoId,
        });

        res.status(201).json(newListing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
