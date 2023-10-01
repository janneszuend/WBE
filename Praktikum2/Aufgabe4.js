const Fibonacci = function (x) {
    let G = (1 + Math.sqrt(5)) / 2
    let H = (1 - Math.sqrt(5)) / 2
    let result = (G**x - H**x) / Math.sqrt(5)

    return Math.round(result)
}

console.log(Fibonacci(2))