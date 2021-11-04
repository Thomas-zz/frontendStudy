/*
 * @lc app=leetcode.cn id=403 lang=javascript
 *
 * [403] 青蛙过河
 */

// @lc code=start
/**
 * @param {number[]} stones
 * @return {boolean}
 */
var canCross = function (stones) {
  const set = new Set();
  return helper(0, 0, set);
  
  function helper(index, jump, set){
    // 这个key是我们生成的一个唯一标识
    const key = index * 1000 + jump;

    if(set.has(key)) return false;
    else set.add(key);

    for(let i = index + 1; i< stones.length; i++){
      const gap = stones[i] - stones[index];
      if(gap >= jump - 1 && gap <= jump + 1){
        if(helper(i, gap, set)){
          return true;
        }
      }else if(gap > jump + 1){
        break;
      }
    }
    return index === stones.length - 1;
  }
};
// @lc code=end

