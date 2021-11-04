/*
 * @lc app=leetcode.cn id=437 lang=javascript
 *
 * [437] 路径总和 III
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
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  if (!root) return 0;

  let map = new Map();
  // "1" 表示有一条前缀和为 0 的子路径
  map.set(0, 1);

  let ans = 0;
  dfs(root, 0);
  return ans;

  function dfs(node, sum) {
    sum += node.val;

    // 如果有前缀和符合 sum - targetSum, 拿到此前缀和对应的子路径个数
    if (map.has(sum - targetSum)) ans += map.get(sum - targetSum);
    // 将此前缀和加入map，更新子路径个数
    map.set(sum, (map.get(sum) || 0) + 1);

    if (node.left) dfs(node.left, sum);
    if (node.right) dfs(node.right, sum);

    // 回溯，包含此节点的，前缀和为sum的路径个数 - 1
    map.set(sum, (map.get(sum) || 0) - 1);
  };
}
// @lc code=end

