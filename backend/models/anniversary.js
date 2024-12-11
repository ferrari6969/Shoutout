const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const anniversarySchema = new mongoose.Schema({
    annId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfJoining: { type: Date, required: true },
    comments: {
        type: [
            {
                commentId: {
                    type: String,
                    default: () => `cmt_${Date.now()}_${nanoid(6)}`,
                },
                content: { type: String, required: true },
                author: { type: String },
                userId: { type: String, required: true },
                date: { type: Date, default: Date.now },
            }
        ],
        default: [],
    }
});

module.exports = mongoose.model('Anniversary', anniversarySchema);
