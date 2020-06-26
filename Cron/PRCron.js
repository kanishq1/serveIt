var cron = require('node-cron');
var db = require('../models/db');

// Cron job to expire PR events that have gone past their expiration.
var task = cron.schedule('* * * * *', async() => {
    try{
        console.log('CRON Running!')
        const events = db.public.pr.event.findAll({
            where: { expired: false }
        });
        events.forEach(i => {
            if(Date.now() >= i.expiration) {
                i.is_expired = true;
                await i.save();
            }
        })
    } catch (err) {
        console.log('Internal server error');
        console.log(err);
        task.stop;
    }
});