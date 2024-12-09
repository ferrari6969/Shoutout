const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/create', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { userId } = req.body; 
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        console.log(user)
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:userId/avatar', async (req, res) => {
    try {
        const { userId } = req.params;
        const { avatarId } = req.body;  
        console.log(userId)
        if (!avatarId) {
            return res.status(400).json({ message: 'Avatar ID is required!' });
        }

        const user = await User.findOneAndUpdate({userId}, { avatarId }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        res.status(200).json({ message: 'Avatar updated successfully!', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
