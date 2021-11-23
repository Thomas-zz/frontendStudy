Function.prototype.before = function (befornFn) {
  let __self = this; // 保存原函数的引用
  return function (...args) {
    befornFn.apply(this, args); // 执行新函数，同时保证this不被劫持，还是原来的this

    // 执行原函数并返回原函数的执行结果，保证原函数this不被劫持
    return __self.apply(this, args);
  };
};

Function.prototype.after = function (afterFn) {
  let __self = this; // 保存原函数的引用
  return function (...args) {
    let ret = __self.apply(this, args);
    afterFn.apply(this, args); // 执行新函数，同时保证this不被劫持，还是原来的this

    // 执行原函数并返回原函数的执行结果，保证原函数this不被劫持
    return ret;
  };
};

let a = function () {
  console.log(1);
};

a = a.before(() => {
  console.log(0);
});

a = a.after(() => {
  console.log(2);
});

a();


