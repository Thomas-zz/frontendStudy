// for、indexof 实现去重
/**
 * 缺点是 indexOf 不够快。
 * 不能去重对象，NaN（indexOf(NaN)查找不到NaN元素，因为indexOf底层用 === 判断）
 */
function unique1(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) === i) res.push(arr[i]);
  }
  return res;
}

/**
 * 和 indexOf 一样，不能去重对象，NaN
 */
function unique2(arr) {
  let res = arr.filter(function (item, index, arr) {
    return arr.indexOf(item) === index;
  });
  return res;
}

/**
 * 利用 set 没有重复值的性质，可以对NaN去重，不能对对象去重，速度快
 */
let unique3 = (arr) => [...new Set(arr)];

/**
 * 能去重NaN，使用includes
 */
Array.prototype.unique = function () {
  let newArr = [];
  this.forEach((item) => {
    if (!newArr.includes(item)) {
      newArr.push(item);
    }
  });
  return newArr;
};

/*
  对象去重
  我们依然无法正确区分出两个对象，比如 {value: 1} 和 {value: 2}，
  因为 typeof item + item 的结果都会是 object[object Object]
*/
function unique4(array) {
  var obj = {};
  return array.filter(function (item, index, array) {
    return obj.hasOwnProperty(typeof item + item)
      ? false
      : (obj[typeof item + item] = true);
  });
}

/**
 * 实际业务上对象数组去重要考虑的很多，比如，两个对象地址相同肯定相同，
 * 但两个对象内容相同算不算相同呢？这些都要考虑到
 */

let array = [
  1,
  2,
  1,
  1,
  "1",
  "1",
  2,
  3,
  { a: 1 },
  { a: 1 },
  { a: 2 },
  NaN,
  NaN,
];
console.log(unique1(array));
console.log(unique2(array));
console.log(unique3(array));
console.log(unique4(array));
