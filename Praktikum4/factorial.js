// function factorial(n){
//     let result = 1
//     if(n <= 1)
//          return  1
//     else
//         for (let i = 2; i <= n; i++ ){
//             result *= i
//         }
//
//     if(typeof(result === 'bigint')){
//         return BigInt(result)
//     }
//     return result
// }
//
// console.log(factorial(50n))
//
//
// module.exports = { factorial }


function factorial(n){
    if (n == 0n || n == 1n) {
        if (typeof n === 'number'){
            return 1
        }
        if (typeof n === 'bigint'){
            return 1n
        }
    }

    if (n > 10){
        var fact = 1n
    }else{
        var fact = 1
    }
    for (let i = 2; i <= n; i++) {
        if(typeof fact === 'bigint'){
            fact *= BigInt(i)
        }else{
            fact *= i
        }
    }

    return fact
}

console.log(factorial(10))
console.log(factorial(50))
console.log(factorial(1))

module.exports = { factorial }