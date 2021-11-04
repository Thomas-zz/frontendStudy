/*
 * @lc app=leetcode.cn id=152 lang=javascript
 *
 * [152] 乘积最大子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  let max = -Infinity, imax = 1, imin = 1;
  for(let i = 0; i < nums.length; i++){
    if(nums[i] < 0){
      let tmp = imax;
      imax = imin;
      imin = tmp;
    }
    imax = Math.max(nums[i], imax * nums[i]);
    imin = Math.min(nums[i], imin * nums[i]);

    max = Math.max(imax, max);
  }
  return max;
};
// @lc code=end

