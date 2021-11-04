/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  let count = 0;
  dfs(0, 0);
  return count;

  function dfs(index, sum) {
    if (index === nums.length) {
      if (sum === target) count++;
    } else {
      dfs(index + 1, sum + nums[index]);
      dfs(index + 1, sum - nums[index]);
    }
  }
};
// @lc code=end

