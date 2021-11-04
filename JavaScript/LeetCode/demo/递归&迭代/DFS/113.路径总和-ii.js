/*
 * @lc app=leetcode.cn id=113 lang=javascript
 *
 * [113] 路径总和 II
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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
  let res = [];
  dfs(root, targetSum);
  return res;
  
  function dfs(node, sum, arr = []){
    if(!node) return ;
    arr.push(node.val);
    if(!node.left && !node.right && sum === node.val){
      res.push([...arr]);
    }
    dfs(node.left, sum - node.val, arr);
    dfs(node.right, sum - node.val, arr);
    arr.pop();
  }
};
// @lc code=end

