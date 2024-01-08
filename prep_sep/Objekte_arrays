function combineArrays(a, b) {
  const result = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (i < a.length) {
      result.push(a[i]);
    }
    if (i < b.length) {
      result.push(b[i]);
    }
  }
  return result;
}




const numbers = [1, 2, 3];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0); // 6




function arrayToObject(array){
  let newObj = {}
  for(let i = 0;i<array.length;i++){
    let str = array[i]
    let num = array[i].length

    newObj[str] = num
  }
  return newObj
}