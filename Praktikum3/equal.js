/*
function equal(a, b) {
    if(a === b) {
        return true
    }
    if(typeof (a) === 'number'){
        return false
    }
    if(typeof(a) !== typeof(b)){
        return false
    }else{
        let arrA = Object.keys(a)
        let arrB = Object.keys(b)
        if(arrA.length !== arrB.length){
            return false
        }else{
            for(let i = 0; i < arrA.length; i++){
                let text = arrA[i]
                if(arrA.includes(text) && arrB.includes(text)){
                    if( a.text !== b.text){
                        return false
                    }
                }else{
                    return false
                }
            }
            return true
        }
    }
}
console.log(equal(15, 16))
console.log(equal(16, 16))
console.log(equal("hi", "hi"))
console.log(equal({}, {}))
console.log(equal({a:1, b:2}, {b:2, a:1}))
console.log(equal({a:1, b:2}, {c:3, b:2, a:1}))
console.log(equal({a:{}}, {a:{}}))

let emptyObj = {}
console.log(equal({a:emptyObj}, {a:emptyObj}))

*/



function equal(obj1, obj2) {
    // Check if obj1 and obj2 are strictly equal using ===
    if (obj1 === obj2) {
        return true;
    }

    // Check if both obj1 and obj2 are objects
    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
        // Get the keys of obj1 and obj2
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        // Check if the number of keys is the same
        if (keys1.length === keys2.length) {
            // Check if all attribute values are strictly equal using ===
            for (const key of keys1) {
                if (obj1[key] !== obj2[key]) {
                    return false;
                }
            }
            return true;
        }
    }

    // If none of the above conditions are met, return false
    return false;
}

// Testing the function with examples
console.log(equal(16, 15))
console.log(equal(16, 16)); // true
console.log(equal("hi", "hi")); // true
console.log(equal({}, {})); // true
console.log(equal({a:1, b:2}, {b:2, a:1})); // true
console.log(equal({a:1, b:2}, {c:3, b:2, a:1})); // false
console.log(equal({a:{}}, {a:{}})); // false
let emptyObje = {};
console.log(equal({a:emptyObje}, {a:emptyObje})); // true

module.exports = {equal}