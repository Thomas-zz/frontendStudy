Array.prototype.map = function (callback, thisArg) {
  // 处理数组类型异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  // 处理回调类型异常
  if (Object.prototype.toString.call(callback) != "[object Function]") {
    throw new TypeError(callback + "is not a function");
  }
  // 草案提到要先转为对象
  let O = Object(this);
  let T = thisArg;
  // 无符号右移0位，转为正整数
  let len = O.length >>> 0;
  // 返回的数组长度等于数组原长度
  let res = new Array(len);
  for (let i = 0; i < len; i++) {
    if (i in O) {
      let value = O[i];
      // 依次传入thisArg，当前项，当前索引，原数组
      let mappedValue = callback.call(T, value, i, O);
      res[i] = mappedValue;
    }
  }
  return res;
};

let arr = [1,2,3];

console.log(
  arr.map((item) => {
    return item * 2;
  })
);
