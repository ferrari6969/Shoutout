const mongoose = require('mongoose');

const festivalListSchema = new mongoose.Schema({
    listingId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    videoId: { type: String, required: true },
});

module.exports = mongoose.model('FestivalList', festivalListSchema);
