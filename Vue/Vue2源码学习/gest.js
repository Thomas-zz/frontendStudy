function* foo(x) {
  let y = yield x + 1;
  // 2. yield语句返回值为undifined
  z = yield y + 1;
  // 5. 打印z = 上一个next传入的值，即4
  console.log(z);
  // 6. 返回{value: 4, done: true}
  return z;
}

let a = foo(3);
// 1. 第一个next，执行到yield语句停下
console.log(a.next());
// 3. 继续执行,return value = NaN,因为unde + 1
console.log(a.next());
// 4. 继续执行到return语句，将4给到上一条yield语句
console.log(a.next(4));

// { value: 4, done: false }
// { value: NaN, done: false }
// 4
// { value: 4, done: true }
