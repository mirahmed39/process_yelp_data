const request = require('request');
const app = require('./yelpfunc');

let baseUrl = "https://foureyes.github.io/csci-ua.0480-fall2017-003/homework/02/";
let currentUrl = "086e27c89913c5c2dde62b6cdd5a27d2.json";

parseJsonFiles(baseUrl+currentUrl);

function parseJsonFiles(url) {
    request(url, function (error, response, body) {
        if (error)
            console.log('Error reading file');
        else {
            let jsonObjects = body.trim();
            jsonObjects = jsonObjects.split('\n');
            let parsedObjects = jsonObjects.map(function (ele) {
                return JSON.parse(ele);
            });
            if (parsedObjects[parsedObjects.length-1].hasOwnProperty("nextFile")) {
                let jsonObjectsSliced = parsedObjects.slice(0, jsonObjects.length - 1);
                console.log("==============================");
                console.log("url: " + baseUrl + currentUrl);
                console.log("==============================");
                console.log(app.processYelpData(jsonObjectsSliced));
                currentUrl = parsedObjects[parsedObjects.length -1].nextFile;
                parseJsonFiles(baseUrl+currentUrl);
            } else {
                console.log("==============================");
                console.log("url: " + baseUrl + currentUrl);
                console.log("==============================");
                console.log(app.processYelpData(parsedObjects));
            }
        }
    });
}





