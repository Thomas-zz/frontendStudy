/**
 * 和实现call的方法差不多，稍微改一下就行
 */

Function.prototype.apply2 = function (context, arr) {
  context = Object(context) || global;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0; i < arr.length; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
  }

  delete context.fn;
  return result;
};
