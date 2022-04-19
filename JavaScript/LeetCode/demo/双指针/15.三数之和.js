/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  let res = [];
  let first = 0, second = 0, last = nums.length - 1;
  // 对数组进行排序
  nums.sort((a, b)=> a - b);

  for(let i = 0; i < nums.length - 2; i++){
    // 排序过的数组，当前数大于0说明后面的都大于0了
    if(nums[i] > 0) break;
    if(i > 0 && nums[i] === nums[i-1]) continue;
    first = nums[i];
    second = i + 1;
    while(second < last){
      let sum = first + nums[second] + nums[last];
      if(sum < 0) continue;
      if(sum > 0) last--;
      else res.push([first, nums[second], nums[last]]) 
      second++;
    }
  }
  return res;
};
// @lc code=end

