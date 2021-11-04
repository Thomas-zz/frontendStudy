/*
 * @lc app=leetcode.cn id=1104 lang=javascript
 *
 * [1104] 二叉树寻路
 */

// @lc code=start
/**
 * @param {number} label
 * @return {number[]}
 */
var pathInZigZagTree = function (label) {
  let res = [];
  let row = Math.ceil(Math.log2(label + 1));

  if (row % 2 === 0) {
    label = reverse(label, row);
  }

  while (row > 0) {
    if (row % 2 === 0) {
      res.unshift(reverse(label, row));
    } else {
      res.unshift(label);
    }
    row--;
    label >>= 1;
  }
  return res;
};
function reverse(label, row) {
  return (1 << row) - 1 - label + (1 << (row - 1));
}
// @lc code=end

