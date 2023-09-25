const power = function (base, exponent) {
    let result = 1
    for(let count = 0; count < exponent; count++){
        result *= base
    }
    return result
}

const power2 = function (base, exponent){
    if(exponent === 0){
        return 1
    }
    return base * power2(base, exponent-1)
}

function assert(condition, message) {
    if (!condition) throw new Error(message || "Assertion failed");
}

const power3 = function (base, exponent){
    const assert = require('assert')

    assert(Number.isInteger(base))
    assert(Number.isInteger(exponent))
    assert(base > 1)
    assert(exponent >= 0)

    if(exponent === 0){
        return 1
    }
    if(exponent%2 === 0){
        return power3(base, exponent/2)**2
    }else{
        return base * power3(base, exponent-1)
    }
}


console.log(power(2, 10))
console.log(power2(2, 10))
console.log(power3(2, -10))