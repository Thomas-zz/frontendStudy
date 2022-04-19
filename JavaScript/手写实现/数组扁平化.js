function flat(arr) {
  let res = [];
  for (let val of arr) {
    if (Array.isArray(val)) {
      res = res.concat(flat(val));
    } else {
      res.push(val);
    }
  }
  return res;
}

// reduce 方法实现
function flatReduce(arr, num = 1) {
  return num > 0
    ? arr.reduce(function (res, next) {
        return res.concat(
          Array.isArray(next) ? flatReduce(next, num - 1) : next
        );
      }, [])
    : arr;
}

// Generator 实现
function* flatGenerator(arr, num = 1) {
  for (const item of arr) {
    if (Array.isArray(item) && num > 0) {
      yield* flatGenerator(item, num - 1);
    } else {
      yield item;
    }
  }
}

// 原型链实现
Array.prototype.fakeFlat = function (num = 1) {
  if (!Number(num) || num < 0) {
    return this;
  }
  let arr = this.slice();
  while (num > 0) {
    if (arr.some((a) => Array.isArray(a))) {
      arr = [].concat(...arr);
    } else {
      break;
    }
    num--;
  }
  return arr;
};

let arr = [1, 2, [3, 4], 5, [6, [7, 8, [9]]]];
console.log(flat(arr));
console.log(flatReduce(arr));
console.log(...flatGenerator(arr, 2));
console.log(arr.fakeFlat(2));


