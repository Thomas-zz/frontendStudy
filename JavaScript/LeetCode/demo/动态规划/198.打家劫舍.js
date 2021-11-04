/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
*/
var rob = function(nums) {
  if(!nums || nums.length === 0) return 0;
  if(nums.length === 1) return nums[0];
  
  let len = nums.length;
  let a = nums[0], b = Math.max(nums[0], nums[1]);
  for(let i = 2; i < len; i++){
    let next = Math.max(a + nums[i], b);
    a = b;
    b = next;
  }
  return b;
};
// @lc code=end

