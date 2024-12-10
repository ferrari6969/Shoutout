const express = require('express');
const router = express.Router();
const Birthday = require('../models/birthday');
const User = require('../models/user');

router.post('/trigger', async (req, res) => {
    try {
        const today = new Date();
        const todayMonthDay = `${today.getMonth() + 1}-${today.getDate()}`;

        const users = await User.find();

        const birthdayPromises = users.map(user => {
            const userBirthday = new Date(user.dateOfBirth);
            const userBirthdayMonthDay = `${userBirthday.getMonth() + 1}-${userBirthday.getDate()}`;

            if (userBirthdayMonthDay === todayMonthDay) {
                const currentYearBirthday = new Date();
                currentYearBirthday.setFullYear(today.getFullYear());

                const bdId = `bd_${user.userId}_${today.getFullYear()}`;

                return Birthday.create({
                    bdId: bdId,
                    name: user.name,
                    dateOfBirth: currentYearBirthday,
                    comments: [],
                });
            }
        });

        const filteredPromises = birthdayPromises.filter(promise => promise !== undefined);

        await Promise.all(filteredPromises);

        res.status(201).json({ message: 'Birthdays created successfully!' });
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

        const birthday = await Birthday.findOne({ bdId: id });
        if (!birthday) {
            return res.status(404).json({ message: 'Birthday not found!' });
        }

        birthday.comments.push({ content, author, userId });
        await birthday.save();

        res.status(201).json({ message: 'Comment added successfully!', birthday });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:id/comments/:commentId', async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const { content, author } = req.body;

        const birthday = await Birthday.findOne({ bdId: id });
        if (!birthday) {
            return res.status(404).json({ message: 'Birthday not found!' });
        }

        console.log('Birthday found:', birthday); // Log the entire birthday object
        console.log('Comment ID:', commentId); // Log the provided commentId
        console.log('Comments array:', birthday.comments); // Log the comments array

        const comment = birthday.comments.find(comment => comment.commentId === commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found!' });
        }

        console.log('Comment found:', comment); // Log the comment that was fetched

        if (content) comment.content = content;
        if (author) comment.author = author;

        await birthday.save();

        res.status(200).json({ message: 'Comment updated successfully!', birthday });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const birthdays = await Birthday.find();
        res.status(200).json(birthdays);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
