// 这是一个普通函数
function add(a, b, c) {
  return a + b + c;
}

// 这是一个柯里化之后的add函数
function curryAdd(a) {
  return b => {
    return c => {
      return a + b + c;
    }
  }
}

// 更简单的写法
let curryAdd2 = a => b => c => a + b + c;

// 试一下
console.log(add(1, 2, 3));        // 6
console.log(curryAdd(4)(5)(6)); // 15
console.log(curryAdd2(1)(2)(3)) // 6


// 那如果更进一步，我想同时实现 add(1,2)(3) 和 add(1)(2,3) 这样的柯里化呢？
const curry = (fn, ...args) =>
  // fn.length 可以获得函数的参数个数
  args.length >= fn.length
    // 传入的参数个数大于等于原始函数fn的参数个数，说明可以直接执行了
    ? fn(...args)
    // 否则继续执行柯里化，返回一个接受所有参数（当前参和剩余参）的函数 
    : (..._args) => curry(fn, ...args, ..._args);


const curryAdd3 = curry(add);

console.log(curryAdd3(1)(2, 3));  // 6
console.log(curryAdd3(1, 2)(3));  // 6
console.log(curryAdd3(1)(2)(3));  // 6

// 无限加的版本
function argsSum(args) {
  return args.reduce((pre, cur) => { return pre + cur })
}
function add2(...args1) {
  let sum1 = argsSum(args1)
  let fn = function (...args2) {
    let sum2 = argsSum(args2)
    return add2(sum1 + sum2)
  }
  // 重写toString() 方法
  fn.toString = function () {
    return sum1
  }
  return fn
}

console.log(add2(1,2)(3)(4).toString());
console.log(add2(1)(2,3,4)(5).toString());
