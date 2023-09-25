const power = function (base, exponent){
    const assert = require('assert')

    assert(Number.isInteger(base), "base not an integer")
    assert(Number.isInteger(exponent), "exponent not an integer")
    assert(base >= 0, "base is under 0")
    assert(exponent >= 0, "exponent is under 0")

    if(exponent === 0){
        return 1
    }
    if(exponent%2 === 0){
        return power(base, exponent/2)**2
    }else{
        return base * power(base, exponent-1)
    }
}

console.log(power(10, 4))

module.exports = {power}