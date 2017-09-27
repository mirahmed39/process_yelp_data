// yelpfunc.js

function averageRating(restaurants) {
    let output = "";
    let totalRating = 0;
    restaurants.forEach(function (ele) {
        totalRating += ele.stars;
    });
    let averageRating = totalRating / restaurants.length;
    output += "* Average rating of the dataset:" +averageRating;
    return output;
}

function pizzaInLasVegas(restaurants) {
    let output = "";
    let pizzaInLasVegas = restaurants.filter(function (ele) {
        return ele.state === 'NV' && ele.city === 'Las Vegas' && ele.categories.indexOf("Pizza") !== -1;
    });
    output += "* All restaurants in Las Vegas, NV that serve pizza\n";
    for (let restaurant of pizzaInLasVegas)
        output += "    * " + restaurant.name + " (* " + restaurant.stars + " stars *)\n";
    return output;
}

function sortRestaurantsByReviewCounts(resA, resB) {
    if (resA.review_count > resB.review_count)
        return -1;
    if (resA.review_count < resB.review_count)
        return 1;
    return 0;
}

function twoMexicanRestaurants(restaurants) {
    let output = "";
    let mexicanRestaurants = restaurants.filter(function (ele) {
        return ele.categories.indexOf("Mexican") !== -1;
    });
    let maxTwo = mexicanRestaurants.sort(sortRestaurantsByReviewCounts).slice(0, 2);
    output += "* The two highest reviewed Mexican serving restaurants are: \n";
    maxTwo.forEach(function (restaurant) {
        output += "    * " +restaurant.name + ", " + restaurant.city + " ("+ restaurant.state + "), " +
            restaurant.review_count + " reviews (* " + restaurant.stars +  " stars *)\n";
    });
    return output;
}

function mostCommonName(restaurants) {
    let output = "* The most common name in the dataset:\n";
    let obj = {};
    let restaurantNames = restaurants.map(function (ele) {
        return ele.name;
    });
    restaurantNames.forEach(function (name) {
        if (!obj.hasOwnProperty(name))
            obj[name] = 1;
        else
            obj[name] = obj[name] + 1;
    });
    let arr = Object.values(obj);
    let mostAppearedNumber = Math.max(...arr);
    let mostAppearedName = "";
    restaurantNames.forEach(function (resName) {
        if (obj[resName] === mostAppearedNumber)
            mostAppearedName = resName;
    });
    output += "    * " + mostAppearedName + " is the most common business and appears " + mostAppearedNumber + " times in the dataset.";

    return output;
}

function stateCount(restaurants) {
    let output = "* Restaurant count by state\n";
    let obj = {};
    let stateNames = restaurants.map(function (ele) {
        return ele.state
    });
    stateNames = stateNames.sort();
    stateNames.forEach(function (name) {
        if (!obj.hasOwnProperty(name))
            obj[name] = 1;
        else
            obj[name] = obj[name] + 1;
    });
    Object.keys(obj).forEach(function (state) {
        output += "    * " + state + ": " + obj[state] + "\n";
    });
    return output;
}
function processYelpData(restaurants) {
    let yelpData = "";
    yelpData += averageRating(restaurants) + "\n";
    yelpData += pizzaInLasVegas(restaurants);
    yelpData += twoMexicanRestaurants(restaurants);
    yelpData += mostCommonName(restaurants) + "\n";
    yelpData += stateCount(restaurants);
    return yelpData;
}

module.exports = {
    processYelpData: processYelpData
};