const mongoose = require('mongoose');
const { nanoid } = require('nanoid'); 

const birthdaySchema = new mongoose.Schema({
    bdId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
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

module.exports = mongoose.model('Birthday', birthdaySchema);
