/*
 * @lc app=leetcode.cn id=993 lang=javascript
 *
 * [993] 二叉树的堂兄弟节点
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
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
// DFS
var isCousins = function (root, x, y) {
  // 三个要比较的状态
  let [xdeep, xdad, xfound] = [-1, null, false];
  let [ydeep, ydad, yfound] = [-1, null, false];
  dfs(root, 0, null);
  // 不用比较xfound和yfound是因为，如果没找到，deep一定不同或dad一定相同
  return (xdeep === ydeep) && (xdad !== ydad);

  function dfs(root, deep, dad) {
    if (!root) return;
    // 如果找到了x
    if (root.val === x) {
      xdeep = deep;
      xdad = dad;
      xfound = true;
    }
    // 如果找到了y
    if (root.val === y) {
      ydeep = deep;
      ydad = dad;
      yfound = true;
    }
    // 都找到了就直接返回，否则继续查找
    if (xfound && yfound) return;
    dfs(root.left, deep + 1, root);
    // 同理，都找到了就直接返回，否则继续查找
    if (xfound && yfound) return;
    dfs(root.right, deep + 1, root);
  }
};

// BFS
var isCousins = function (root, x, y) {
  let [xdeep, xdad, xfound] = [-1, null, false];
  let [ydeep, ydad, yfound] = [-1, null, false];

  // 辅助函数，用于比较节点的值
  function compare(node, dad, deep) {
    if (node.val === x) {
      [xdeep, xdad, xfound] = [deep, dad, true];
    } else if (node.val === y) {
      [ydeep, ydad, yfound] = [deep, dad, true];
    }
  }

  // 多存一个节点深度
  let queue = [[root, 0]];
  while (queue.length > 0) {
    let [node, deep] = queue.shift();
    if (node.left) {
      queue.push([node.left, deep + 1]);
      compare(node.left, node, deep + 1);
    }
    if (node.right) {
      queue.push([node.right, deep + 1]);
      compare(node.right, node, deep + 1);
    }

    if(xfound && yfound) break;
  }

  return xdeep === ydeep && xdad !== ydad;
}
// @lc code=end

