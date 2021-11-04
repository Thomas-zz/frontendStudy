/*
 * @lc app=leetcode.cn id=872 lang=javascript
 *
 * [872] 叶子相似的树
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function(root1, root2) {
  let leaf1 = [];
  let leaf2 = [];
  dfs(root1, leaf1);
  dfs(root2, leaf2);
  return leaf1.toString() === leaf2.toString();

  // 这里的leaf是对数组的引用
  function dfs(node, leaf = []){
    if(!node) return ;
    // 中序遍历
    if(!node.left && !node.right) leaf.push(node.val);
    dfs(node.left, leaf);
    dfs(node.right, leaf);
  }
};
// @lc code=end

