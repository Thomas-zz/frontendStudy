/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第K小的元素
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  let res = 0;
  dfs(root);
  return res;

  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    k--;
    if (k === 0) {
      res = node.val;
      return;
    } else dfs(node.right);
  }
};
// @lc code=end
