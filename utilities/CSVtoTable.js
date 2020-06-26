var csv = require('csvtojson');
var fs = require('fs');
var config = require('../config/config');
// var db = require('')

(async () => {
    try {
        // Enter the path of the csv file containing the necessary data.
        // const csvfilepath = config.exam.csv;
        const csvfilepath = '/Users/sarveshshinde/Downloads/data.csv'
        const jsonArr = await csv().fromFile(csvfilepath);
        console.log(jsonArr[0]);
        const jsonObj = {
            data: jsonArr
        }
        fs.writeFile('exam.json', JSON.stringify(jsonObj, null, 2), (err) => {
            console.log(err);
        })
    } catch (err) {
        console.log(err);
    }
})();
/* then(jsonObj => {
    console.log(jsonObj[0]);
    // Run loop to convert jsonObj into postgres db
}) */