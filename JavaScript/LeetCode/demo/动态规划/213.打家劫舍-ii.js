/*
 * @lc app=leetcode.cn id=213 lang=javascript
 *
 * [213] 打家劫舍 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (!nums || nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);
  len = nums.length;
  return Math.max(rang(0, len - 1), rang(1, len));

  function rang(start, end){
    let a = nums[start], b = Math.max(a, nums[start + 1]);
    for(let i = start + 2; i < end; i++){
      let next = Math.max(a + nums[i], b);
      a = b;
      b = next;
    }
    return b;
  }
};
// @lc code=end

