const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const birthdayRoutes = require('./routes/birthdayRoutes');
const anniversaryRoutes = require('./routes/anniversaryRoutes')
const appreciationRoutes = require('./routes/appreciationRoutes')
const teamAchievementsRoutes = require('./routes/teamAchievementsRoutes')
const festivalRoute = require('./routes/festivalRoute')
const festival = require('./routes/festivalFrontendRoute')
const festivalCron = require('./routes/festivalCron')
const teamParties = require('./routes/teamParties')
const officialEvents = require('./routes/officialEvents')
const cron = require('./cron');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/birthdays', birthdayRoutes);
app.use('/api/workAnniversaries', anniversaryRoutes)
app.use('/api/appreciation', appreciationRoutes)
app.use('/api/teamAchievements', teamAchievementsRoutes)
app.use('/api/festivals', festivalRoute)
app.use('/api/festivalCron', festivalCron)
app.use('/api/festivalFront', festival)
app.use('/api/teamParties', teamParties)
app.use('/api/officialEvents', officialEvents)

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Starting cron job...');
    cron;
});
