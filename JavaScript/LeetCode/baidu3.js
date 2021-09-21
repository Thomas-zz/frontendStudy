function fn(nums) {
  let flag = 0;
  let res = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    if (parseInt(nums[i]) === 0) {
      res.unshift(3);
      flag = 1;
    } else {
      let num = parseInt(nums[i]) - flag;
      if (flag === 1) flag--;
      if (num === 0) {
        if (i === 0) continue;
        res.unshift(3);
        flag++;
      } else if (num > 3) {
        res.unshift(3);
        res[0] = 3;
      } else {
        res.unshift(num);
      }
    }
  }

  console.log(parseInt(res.join('')));
}

fn('1056')