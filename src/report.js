const fs = require('fs');

// notes on json parse and stringify
// JSON.stringify turns a Javascript object into JSON text and stores that JSON text in a string.
// JSON.parse turns a string of JSON text into a Javascript object

function sortRestaurantsByReviewCounts(resA, resB) {
    if (resA.review_count > resB.review_count)
        return -1;
    if (resA.review_count < resB.review_count)
        return 1;
    return 0;
}

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

    // function for average ratings(stars).
    let totalRating = 0;
    parsedObjects.forEach(function (ele) {
        totalRating += ele.stars;
    });
    let averageRating = totalRating / parsedObjects.length;
    console.log("* Average rating of the dataset:", averageRating);

    // function for all the pizza slices in las vegas, nevada
    let pizzaInLasVegas = parsedObjects.filter(function (ele) {
        return ele.state === 'NV' && ele.city === 'Las Vegas' && ele.categories.indexOf("Pizza") !== -1;
    });
    console.log("* All restaurants in Las Vegas, NV that serve pizza");
    for (let restaurant of pizzaInLasVegas)
        console.log("    *", restaurant.name, "(*", restaurant.stars, "*)");
    
    //function for two mexican restaurants with the most reviews.
    let mexicanRestaurants = parsedObjects.filter(function (ele) {
        return ele.categories.indexOf("Mexican") !== -1;
    });
    let maxTwo = mexicanRestaurants.sort(sortRestaurantsByReviewCounts).slice(0, 2);
    console.log("* The two highest reviewed Mexican serving restaurants are: ");
    maxTwo.forEach(function (restaurant) {
        console.log(restaurant.name, ", ", restaurant.city, " (", restaurant.state, "), ",
            restaurant.review_count, "reviews (* ", restaurant.stars, "stars *)");
    });
    // function for most common name
    let obj2 = {};
    let restaurantNames = parsedObjects.map(function (ele) {
        return ele.name;
    });
    restaurantNames.forEach(function (name) {
        if (!obj2.hasOwnProperty(name))
            obj2[name] = 1;
        else
            obj2[name] = obj2[name] + 1;
    });
    let arr = Object.values(obj2);
    let mostAppearedNumber = Math.max(...arr);
    let mostAppearedName = "";
    restaurantNames.forEach(function (resName) {
        if (obj2[resName] === mostAppearedNumber)
            mostAppearedName = resName;
    });
    console.log(mostAppearedName, "is the most common business and appears", mostAppearedNumber, "times in the dataset.");
    //function for restaurant count for each state.
    // first group all the restaurants
    let obj = {};
    let stateNames = parsedObjects.map(function (ele) {
        return ele.state
    });
    stateNames = stateNames.sort();
    stateNames.forEach(function (name) {
        if (!obj.hasOwnProperty(name))
            obj[name] = 1;
        else
            obj[name] = obj[name] + 1;
    });
    console.log(obj);
});


