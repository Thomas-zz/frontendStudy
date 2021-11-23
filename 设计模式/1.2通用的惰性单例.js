// 单例模式的核心逻辑
var getSingle = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};

var someMethod = function () {
  return Symbol(1);
};

var createSingleMethod = getSingle(someMethod);

console.log(someMethod() === someMethod())   // false

console.log(createSingleMethod() === createSingleMethod())   // true
