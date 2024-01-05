const power = function (b, n){

  if (n === 0){
    return 1
  } else {
    return b * power(b, n-1)
  }

}

let num = power(2,2)

console.log(num)