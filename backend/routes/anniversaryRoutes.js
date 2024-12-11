const express = require('express');
const router = express.Router();
const Anniversary = require('../models/anniversary');
const User = require('../models/user');

router.post('/trigger', async (req, res) => {
    try {
        const today = new Date();
        const todayMonthDay = `${today.getMonth() + 1}-${today.getDate()}`;

        const users = await User.find();

        const anniversaryPromises = users.map(user => {
            const userAnniversary = new Date(user.dateOfJoining);
            const userAnniversaryMonthDay = `${userAnniversary.getMonth() + 1}-${userAnniversary.getDate()}`;

            if (userAnniversaryMonthDay === todayMonthDay) {
                const currentYearAnniversary = new Date();
                currentYearAnniversary.setFullYear(today.getFullYear());

                const annId = `ann_${user.userId}_${today.getFullYear()}`;

                return Anniversary.create({
                    annId: annId,
                    name: user.name,
                    dateOfJoining: currentYearAnniversary,
                    comments: [],
                });
            }
        });

        const filteredPromises = anniversaryPromises.filter(promise => promise !== undefined);

        await Promise.all(filteredPromises);

        res.status(201).json({ message: 'Anniversaries created successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const { content, author, userId } = req.body;

        if (!content || !userId) {
            return res.status(400).json({ message: 'Content and userId are required!' });
        }

        const anniversary = await Anniversary.findOne({ annId: id });
        if (!anniversary) {
            return res.status(404).json({ message: 'Anniversary not found!' });
        }

        anniversary.comments.push({ content, author, userId });
        await anniversary.save();

        res.status(201).json({ message: 'Comment added successfully!', anniversary });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id/comments/:commentId', async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const { content, author } = req.body;

        const anniversary = await Anniversary.findOne({ annId: id });
        if (!anniversary) {
            return res.status(404).json({ message: 'Anniversary not found!' });
        }

        const comment = anniversary.comments.find(comment => comment.commentId === commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found!' });
        }

        if (content) comment.content = content;
        if (author) comment.author = author;

        await anniversary.save();

        res.status(200).json({ message: 'Comment updated successfully!', anniversary });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const anniversaries = await Anniversary.find();
        res.status(200).json(anniversaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
