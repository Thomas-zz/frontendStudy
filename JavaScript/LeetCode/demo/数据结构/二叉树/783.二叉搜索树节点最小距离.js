/*
 * @lc app=leetcode.cn id=783 lang=javascript
 *
 * [783] 二叉搜索树节点最小距离
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function (root) {
  let pre = -1;
  let min = 100000;

  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    if (pre === -1) {
      pre = node.val;
    } else {
      min = Math.min((node.val - pre), min);
      pre = node.val;
    }
    dfs(node.right);
  }

  dfs(root);
  return min;
};
// @lc code=end

