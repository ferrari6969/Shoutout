const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const birthdayRoutes = require('./routes/birthdayRoutes');
const anniversaryRoutes = require('./routes/anniversaryRoutes')
const appreciationRoutes = require('./routes/appreciationRoutes')
const cron = require('./cron');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/birthdays', birthdayRoutes);
app.use('/api/anniversary', anniversaryRoutes)
app.use('/api/appreciation', appreciationRoutes)

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Starting cron job...');
    cron;
});
