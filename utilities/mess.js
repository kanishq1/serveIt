var db = require('../models/db');
var fs = require('fs');

(async () => {
    const mess = JSON.parse(fs.readFileSync('mess.json', 'utf-8')).mess;
    console.log(mess[0]);
    try {
        const messsaved = await db.public.mess.bulkCreate(mess, { returning: true });
        console.log(messsaved[0]);
        process.exit();
    } catch (err) {
        console.log(err);
    }
})();