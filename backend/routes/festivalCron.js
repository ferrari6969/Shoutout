const express = require('express');
const FestivalList = require('../models/festivalListing');
const FestivalShowcase = require('../models/festival');
const router = express.Router();

router.post('/create-festivals', async (req, res) => {
    try {
        const today = new Date();
        const todayMonth = today.getMonth() + 1; 
        const todayDay = today.getDate();
        const currentYear = today.getFullYear();

        const listings = await FestivalList.find({ month: todayMonth, day: todayDay });

        if (listings.length === 0) {
            return res.status(200).json({ message: 'No festivals match today\'s date.' });
        }

        const festivalPromises = listings.map(listing => {
            const festivalDate = new Date(Date.UTC(currentYear, listing.month - 1, listing.day, 0, 0, 0));
            const festivalId = `${listing.name.toLowerCase().replace(/ /g, '-')}-${currentYear}`;
            console.log(festivalDate)
            return FestivalShowcase.create({
                festivalId,
                name: listing.name,
                year: currentYear,
                date: festivalDate,
                videoId: listing.videoId,
                isPast: false,
            });
        });

        await Promise.all(festivalPromises);
        res.status(201).json({ message: 'Festivals for today have been created.' });
    } catch (error) {
        console.error('Error creating festivals:', error.message);
        res.status(500).json({ error: 'Error creating festivals.' });
    }
});

router.post('/update-past-festivals', async (req, res) => {
    try {
        const today = new Date();
        await FestivalShowcase.updateMany({ date: { $lt: today } }, { $set: { isPast: true } });
        res.status(200).json({ message: 'Updated past festivals.' });
    } catch (err) {
        console.error('Error updating past festivals:', err.message);
        res.status(500).json({ error: 'Error updating past festivals.' });
    }
});

module.exports = router;
