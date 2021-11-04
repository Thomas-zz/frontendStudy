/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let len = nums.length;
  let arr = new Array(len).fill(len);
  arr[0] = 0;
  for (let i = 0; i < len; i++) {
    for (let j = 1; j <= nums[i]; j++) {
      arr[i + j] = Math.min(arr[i + j], arr[i] + 1);
    }
  }
  return arr[len - 1];
};

var jump = function (nums) {
  let len = nums.length - 1;
  let step = 0;
  let maxPostition = 0;
  let end = 0;
  for (let i = 0; i < len; i++) {
    maxPostition = Math.max(i + nums[i], maxPostition);
    // 更新 end 为在此范围内可以到达的最远距离
    if (i === end) {
      step++;
      end = maxPostition
    }
  }
  return step;
};
// @lc code=end

