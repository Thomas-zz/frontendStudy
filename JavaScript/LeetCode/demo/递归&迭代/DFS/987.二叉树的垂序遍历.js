/*
 * @lc app=leetcode.cn id=987 lang=javascript
 *
 * [987] 二叉树的垂序遍历
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
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
  // 定义一个数组存放每个节点的[x值，y值，val值]
  const arr = [];
  dfs(root, 0, 0);

  // 按照优先级排序
  arr.sort((a, b) => {
    if (a.y !== b.y) {
      return a.y - b.y;
    } else if (a.x !== b.x) {
      return a.x - b.x;
    } else {
      return a.val - b.val;
    }
  })

  let res = [];
  let preY = -Infinity;
  for (const ans of arr) {
    if (ans.y !== preY) {
      preY = ans.y;
      res.push([])
    }
    res[res.length - 1].push(ans.val);
  }
  return res;

  // 递归遍历每个节点
  function dfs(node, x, y) {
    if (!node) return;
    arr.push({ x: x, y: y, val: node.val });
    dfs(node.left, x + 1, y - 1);
    dfs(node.right, x + 1, y + 1);
  }
};
// @lc code=end

