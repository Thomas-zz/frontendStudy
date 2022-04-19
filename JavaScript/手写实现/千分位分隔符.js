function numFormat(num) {
  num = num.toString().split(".");
  let arr = num[0].split("").reverse();
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      res.push(",");
    }
    res.push(arr[i]);
  }
  res.reverse();
  if (num[1]) {
    res = res.join("").concat("." + num[1]);
  } else {
    res = res.join("");
  }
  return res;
}

// 使用 JS 自带的 toLocaleString()
// toLocaleString() 方法返回这个数字在特定语言环境下的表示字符串。
// 小数部分会根据四舍五入只留下三位
function toFormat(num) {
  return num.toLocaleString();
}

// 正则，不会啊
function RegFormat(num) {
  var res = num.toString().replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ",";
    });
  });
  return res;
}

var a = 1234567894532;
var b = 673439.4542;
console.log(numFormat(a)); // "1,234,567,894,532"
console.log(numFormat(b)); // "673,439.4542"

var a = 1234567894532;
var b = 673439.4542;
console.log(numFormat(a)); // "1,234,567,894,532"
console.log(numFormat(b)); // "673,439.4542"

console.log(toFormat(a)); // "1,234,567,894,532"
console.log(toFormat(b)); // "673,439.4542"
