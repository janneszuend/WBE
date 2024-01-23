var promise = new Promise (function (resolve, reject) {
  console.log ('a '); 
  resolve()
}) ;
promise. then (function () {
console. log('b ')
}) ;
console. log ('c ');