// hoffy.js
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

function repeatCallAllArgs(fn, n, ...args) {
    let temp = args.reduce(function (prev, cur) {
        return prev + cur + " ";
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

function createFullName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}
//console.log('first');
console.log(maybe(createFullName)('Frederick', 'Functionstein')); // Frederick Functionstein
//console.log('second');
//maybe(createFullName)(null, 'Functionstein');        // undefined
//console.log('third');
//maybe(createFullName)('Freddy', undefined);          // undefined


module.exports = {
    sum: sum,
    repeatCall: repeatCall,
    repeatCallAllArgs: repeatCallAllArgs,
    maybe: maybe
};