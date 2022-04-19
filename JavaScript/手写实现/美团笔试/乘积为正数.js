function fn(nums) {
  let res = 0;
  // 负数个数
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === -1) {
      count++;
    } else {
      res++;
    }
    if (count % 2 === 0) {
      res++;
    }
    console.log(res)
  }
  return res;
}

console.log(fn([1, 1, -1, -1]));
