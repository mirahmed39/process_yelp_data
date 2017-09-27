const fs = require('fs');
const app = require('./yelpfunc');

fs.readFile('C:\\Users\\Mir\\Dropbox\\NYU-classes\\5th_semester\\Applied_Internet_Tech\\homeworks\\homework02-data\\business.json', 'utf8', (err, data) =>{
    if (err) {
        console.log(err);
        console.log("Error reading a file");
    }
    let jsonObjects = data.trim();
    jsonObjects = jsonObjects.split('\n');
    jsonObjects = jsonObjects.slice(0, jsonObjects.length -1);
    const parsedObjects = jsonObjects.map(function (ele) {
        let trimmedString = ele.trim();
        return JSON.parse(trimmedString);
    });

    console.log(app.processYelpData(parsedObjects));
});



