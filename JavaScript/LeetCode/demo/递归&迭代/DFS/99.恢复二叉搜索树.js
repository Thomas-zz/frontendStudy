/*
 * @lc app=leetcode.cn id=99 lang=javascript
 *
 * [99] 恢复二叉搜索树
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function (root) {
  const arr = [];
  // 递归存放升序序列
  dfs(root);

  //找到要交换的两个值 
  let val1 = null, val2 = null;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      // 第一次找到赋值给val1，第二次找到赋值给val2
      !val1 ? val1 = arr[i] : val2 = arr[i + 1];
    }
  }
  // 如果只找到了一次，手动给val2赋值
  val2 = !val2 ? arr[arr.indexOf(val1) + 1] : val2

  // 是否已经修改值，为之后剪枝做准备
  let [isSwap1, isSwap2] = [false, false];
  swap(root);
  return root;

  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    arr.push(node.val);
    dfs(node.right)
  }

  // 说是交换，其实就是找到节点，重新赋值
  function swap(node) {
    if (!node) return;
    if (node.val === val1) node.val = val2;
    else if (node.val === val2) node.val = val1;
    // 剪枝
    if (isSwap1 && isSwap2) return;
    swap(node.left);
    swap(node.right);
  }
};

var recoverTree = function (root) {
  let [val1, val2] = [null, null];
  let pre = null;
  dfs(root);
  swap(val1, val2);
  return root;

  // 中序遍历
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    if (pre === null) pre = node;
    else {
      if (node.val < pre.val) {
        val2 = node;
        // 只有第一次找到时，给val1赋值
        if (val1 === null) {
          val1 = pre;
        }
      }
      pre = node;
    }
    dfs(node.right);
  }

  function swap(node1, node2) {
    let num = node1.val;
    node1.val = node2.val;
    node2.val = num;
  }
};

var recoverTree = function (root) {
  let [val1, val2] = [null, null];
  let pre = null;
  let tmp = null;
  while (root) {
    if (root.left) {
      tmp = root.left;
      // 拿到左子树的最右节点
      while (tmp.right && tmp.right !== root) {
        tmp = tmp.right;
      }
      // 左子树最右节点的右指针指向root
      if (tmp.right === null) {
        tmp.right = root;
        root = root.left;
      } else {
        if (pre && pre.val > root.val) {
          val2 = root;
          if (!val1) {
            val1 = pre;
          }
        }
        pre = root;
        // 左子树访问完了，将指针断开防止成环
        tmp.right = null;
        root = root.right;
      }
    } else {
      if (pre && pre.val > root.val) {
        val2 = root;
        if (!val1) {
          val1 = pre;
        }
      }
      pre = root;
      root = root.right;
    }
  }
  swap(val1, val2);
  return root;

  function swap(node1, node2) {
    let num = node1.val;
    node1.val = node2.val;
    node2.val = num;
  }
};
// @lc code=end

