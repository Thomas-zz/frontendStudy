// 第一版
Function.prototype.bind2 = function (context) {
  var self = this;
  return function () {
    return self.apply(context)
  }
}


// 第二版，用arguments处理传参
Function.prototype.bind2 = function (context) {
  var self = this;
  // 获取bind2函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1);

  return function () {
    // 获取bind返回的函数传入的参数
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(context, args.concat(bindArgs));
  }
}


// 当bind返回的函数作为构造函数的时候，bind时指定的this值会失效，但传入的参数依然生效
// 第三版，修改返回的函数的原型，实现new可以改变this的指向
Function.prototype.bind2 = function (context) {
  var self = this;
  // 获取bind2函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1);

  var fBound = function () {
    // 获取bind返的函数传入的参数
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
  }

  // 这样子我们修改fBound.prototype 也会修改到 this.prototype（引用类型）,这样不好
  fBound.prototype = this.prototype;
  return fBound;
}

// 第四版，优化
Function.prototype.bind2 = function (context) {

  if (typeof this !== "function") {
    throw new TypeError("调用bind的不是函数");
  }

  var self = this;
  // 获取bind2函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1);

  var fn = function () { };

  var Bound = function () {
    // 获取bind返的函数传入的参数
    var bindArgs = Array.prototype.slice.call(arguments);
    // 看看this指向有没有改变，还是不是在Bound原型链上
    return self.apply(this instanceof Bound ? this : context, args.concat(bindArgs));
  }
  fn.prototype = this.prototype;
  Bound.prototype = new fn();
  return Bound;
}

// ---------------------示例---------------------
var value = 2;
var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
    return {123:123};
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind2(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj);
console.log(obj.friend);
// shopping
// kevin



