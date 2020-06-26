var db = require('../models/db');
var fs = require('fs');

(async () => {
    const clubs = JSON.parse(fs.readFileSync('clubs.json', 'utf-8')).clubs;
    console.log(clubs);
    try {
        const clubssaved = await db.public.clubs.bulkCreate(clubs, { returning: true });
        console.log(clubssaved[0]);
        process.exit();
    } catch (err) {
        console.log(err);
    }
})();