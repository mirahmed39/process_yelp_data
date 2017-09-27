// hoffy.js
const fs = require('fs');

function sum(...numn) {
    let total = 0;
    const nums = numn;
    if(nums.length === 0)
        return total;
    total = nums.reduce(function(curSum, eachNum){
        return curSum + eachNum;
    }, 0);
    return total;
}

function repeatCall(fn, n, arg) {
    let array = new Array(n).fill(arg);
    array.map(function(arg) {
        fn(arg);
    });
}

// we can use loops.
function repeatCallAllArgs(fn, n, ...args) {
    let temp = args.reduce(function (prev, cur) {
        return prev + " " + cur;
    }, "");
    repeatCall(fn, n, temp);
}

function maybe(fn) {
    return function (...args) {
        let hasNull = args.filter(function(ele) {
            return ele === null || ele === undefined;
        });
        if (hasNull.length > 0)
            return undefined;
        else
            return fn(...args);
    };
}

function constrainDecorator(fn, min, max) {
    return function (...args) {
       let output = fn(...args);
       if (output < min)
           return min;
       else if (output > max)
           return max;
       else
           return fn(...args);
    };
}

function limitCallsDecorator(fn, n) {
    let count = 0;
    return function (...args) {
        if (count < n) {
            count++;
            return fn(...args);
        } else
            return undefined;
    };
}

function filterWith(fn) {
    return function (array) {
        return array.filter(function (ele) {
            return fn(ele);
        });
    };
}

function simpleINIParse(s) {
    let parsedString = s.split('\n');
    let obj = {};
    parsedString.map(function (ele) {
        let keyAndVal = ele.split('=');
        if (keyAndVal.length === 2) {
            if (keyAndVal[0] === undefined)
                obj[''] = keyAndVal[1];
            else if ( keyAndVal[1] === undefined)
                obj[keyAndVal[0]] = '';
            else
                obj[keyAndVal[0]] = keyAndVal[1];
        }
    });
    return obj;
}

function readFileWith(fn) {
    return function (fileName, callBackFn) {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                // there's an error.
                data = undefined;
                callBackFn(err, data);
            } else {
                // there's no error, parse the file with original function
                let parsedData = fn(data);
                callBackFn(err, parsedData);
            }
        });
    }
}

module.exports = {
    sum: sum,
    repeatCall: repeatCall,
    repeatCallAllArgs: repeatCallAllArgs,
    maybe: maybe,
    constrainDecorator: constrainDecorator,
    limitCallsDecorator: limitCallsDecorator,
    filterWith: filterWith,
    simpleINIParse: simpleINIParse,
    readFileWith: readFileWith,
};