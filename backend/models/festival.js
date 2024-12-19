const mongoose = require('mongoose');

const festivalShowcaseSchema = new mongoose.Schema({
    festivalId: { type: String, required: true, unique: true }, // e.g., diwali-2024
    name: { type: String, required: true },
    year: { type: Number, required: true },
    date: { type: Date, required: true },
    videoId: { type: String, required: true },
    isPast: { type: Boolean, default: false },
});

module.exports = mongoose.model('FestivalShowcase', festivalShowcaseSchema);
