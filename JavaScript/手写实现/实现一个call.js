// call 可以修改this的指向，我们可以用三步来模拟
/**
 * 1. 将函数设为对象的属性
 * 2. 执行该函数
 * 3. 删除该函数
 */

// 第一版
Function.prototype.call1 = function (context) {
  context.fn = this;
  context.fn();
  delete context.fn;
};

// 第二版，我们的call要能接收参数，而且参数数量不固定
/**
 * 这里的模拟方法有两种
 * 1. 使用...接受不定长度的参数，但call是ES3的方法，那时候还没有...
 * 2. 使用arguments，虽然现在不推荐使用了
 */

Function.prototype.call2 = function (context) {
  context.fn = this;
  var args = [];
  // 从i = 1开始，因为arguments第一个数据是函数名，当然用var更符合ES3
  for (var i = 1; i < arguments.length; i++) {
    // args是一个字符串数组
    args.push('arguments[' + i + ']');
  }
  // 拼接后eval里是一整个字符串,context.fn(arguments[1],arguments[2])
  eval('context.fn(' + args +')');
  delete context.fn;
};


/**第三版，解决两个问题
 * 1. this参数可以传null，当this为null的时候，视为指向window
 * 2. 函数可以有返回值
 */

Function.prototype.call3 = function (context) {
  // 在node环境下测试的，所以我们将window改为global
  context = context || global;
  context.fn = this;

  var args = [];
  // 从i = 1开始，因为arguments第一个数据是函数名，当然用var更符合ES3
  for (var i = 1; i < arguments.length; i++) {
    // args是一个字符串数组
    args.push('arguments[' + i + ']');
  }
  // 拼接后eval里是一整个字符串,context.fn(arguments[1],arguments[2])
  var result = eval('context.fn(' + args +')');

  delete context.fn;
  return result
};

var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call3(null); // 2

console.log(bar.call3(obj, 'kevin', 18));
