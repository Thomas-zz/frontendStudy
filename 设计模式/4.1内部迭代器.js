let each = function (arr, callback) {
  for (let i = 0, l = arr.length; i < l; i++) {
    // 把下标和元素当做参数传给callback函数
    callback.call(arr[i], i, arr[i]);
  }
};

each([1, 2, 3], function (i, n) {
  console.log([i, n]);
});
