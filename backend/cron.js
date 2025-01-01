const cron = require('node-cron');
const axios = require('axios'); 

//cron job to run every day at midnight (12:00 AM)
cron.schedule('0 0 * * *', async () => {
    try {
        console.log('Running daily birthday check...');

        const response = await axios.post('http://localhost:9000/api/birthdays/trigger');
        console.log('Birthday trigger response:', response.data);

        console.log('Running daily Anniversary check...');

        const response_wa = await axios.post('http://localhost:9000/api/workAnniversaries/trigger');
        console.log('Anniversary trigger response:', response_wa.data);
        console.log("Running daily festival check...");
        const response_cron = await axios.post('http://localhost:9000/api/festivalCron/create-festivals');
        const response_cron_past = await axios.post('http://localhost:9000/api/festivalCron/update-past-festivals');
        console.log('festival trigger response: ', response_cron, response_cron_past)

    } catch (error) {
        console.error('Error running birthday trigger:', error.message);
    }
});

module.exports = cron;
