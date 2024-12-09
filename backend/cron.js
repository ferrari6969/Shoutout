const cron = require('node-cron');
const axios = require('axios'); 

//cron job to run every day at midnight (12:00 AM)
cron.schedule('0 0 * * *', async () => {
    try {
        console.log('Running daily birthday check...');

        const response = await axios.post('http://localhost:9000/api/birthdays/trigger');
        console.log('Birthday trigger response:', response.data);
    } catch (error) {
        console.error('Error running birthday trigger:', error.message);
    }
});

module.exports = cron;
