const cron = require('node-cron');
const db = require('../models/db');

// Cron job to delete events which have Complaint_status = 2

let deletion = cron.schedule('* 4 * * *', async () => {
    try{
        console.log("CRON is running!!");
        
        db.public.complaints.destroy({
            where: {complaint_status: 2}
        })

    }
    catch(e){
        console.error("Something went wrong, Cron stopped working", e);
        deletion.stop();
    }
})
