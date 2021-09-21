// function A(){
//   this.name = 'A';
// }

// let a = new A();

// console.log(Object.getPrototypeOf(a) === A.prototype)
// console.log(Object.getPrototypeOf(A) === Function.prototype)
// console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype)
function A(){
  let a = 1;
  let b = 2;
  function B(){
    console.log(a);
  }
  return B;
}

let B = A();
B();