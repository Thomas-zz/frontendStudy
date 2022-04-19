/**
 * 要求：1. 每人都要有，金额不能为 0；
 * 2. 金额尽量随机，保留两位小数
 * 3. 每人分得的金额加起来为总金额
 * @param {Number} amount 红包的总金额
 * @param {Number} number 分的人数
 * @return {Array}
 */
function redPacket(amount, number) {
  // 结果数组
  const res = [];
  // 第一轮遍历后，各项数的总和
  let sum = 0;
  for (let i = 0; i < number; i++) {
    let num = (amount / number) * Math.random();
    num = Math.floor(num * 100) / 100;
    sum += num;
    res.push(num);
  }
  // 将剩下的金额平分到每个红包上
  const rest = Math.floor((amount - sum) / number * 100) / 100;
  res.forEach((_, index) => {
    res[index] = res[index] + rest;
  });
  return res;
}

const res = redPacket(100, 10); // [ 2.22, 6.21, 8.88, ...]
console.log(res);
console.log(res.reduce((a, b) => a + b));


function redPacket2(amount, number) {
  // 结果数组
  const res = [];
  // 第一轮遍历后，各项数的总和
  let sum = 0;
  for (let i = 0; i < number; i++) {
    let num = +((amount / number) * Math.random()).toPrecision(2);
    sum += num;
    res.push(num);
  }
  // 将剩下的金额平分到每个红包上
  const rest = +((amount - sum) / number).toPrecision(2);
  res.forEach((_, index) => {
    res[index] = res[index] + rest;
  });
  return res;
}

const res2 = redPacket2(100, 10); // [ 2.22, 6.21, 8.88, ...]
console.log(res2);
console.log(res2.reduce((a, b) => a + b));