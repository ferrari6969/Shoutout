const cron = require('node-cron');
const FestivalList = require('../models/festivalListing');
const FestivalShowcase = require('../models/festival');

cron.schedule('0 0 * * *', async () => {
    try {
        const listings = await FestivalList.find();
        const currentYear = new Date().getFullYear();

        const festivalPromises = listings.map(listing => {
            const festivalDate = new Date(currentYear, listing.month - 1, listing.day);
            const festivalId = `${listing.name.toLowerCase().replace(/ /g, '-')}-${currentYear}`;

            return FestivalShowcase.create({
                festivalId,
                name: listing.name,
                year: currentYear,
                date: festivalDate,
                videoId: listing.videoId,
                isPast: festivalDate < new Date(),
            });
        });

        await Promise.all(festivalPromises);
        console.log('Festivals for the year have been created.');
    } catch (error) {
        console.error('Error creating festivals:', error.message);
    }
});

// Update isPast field daily
cron.schedule('0 0 * * *', async () => {
    try {
        const today = new Date();
        await FestivalShowcase.updateMany({ date: { $lt: today } }, { $set: { isPast: true } });
        console.log('Updated past festivals.');
    } catch (err) {
        console.error('Error updating past festivals:', err.message);
    }
});
