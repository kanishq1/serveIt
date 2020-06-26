var db = require('../models/db');
var fs = require('fs');

(async () => {
    const exam = JSON.parse(fs.readFileSync('exam.json', 'utf-8')).data;
    console.log(exam[0]);
    const clubs = JSON.parse(fs.readFileSync('clubs.json', 'utf-8')).clubs;
    console.log(clubs[0]);
    try {
        const examsaved = await db.public.exam.bulkCreate(exam, { returning: true });
        console.log(examsaved[0]);
        const clubssaved = await db.public.clubs.bulkCreate(clubs, { returning: true });
        console.log(clubssaved[0]);
        process.exit();
    } catch (err) {
        console.log(err);
    }
})();