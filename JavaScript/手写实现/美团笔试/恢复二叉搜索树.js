function TreeRecover(root) {
  let [val1, val2] = [null, null];
  let pre = null;
  dfs(root);
  swap(val1, val2);
  return root;

  function dfs(node) {
    if (!node) return node;
    dfs(node.left);
    if (pre === null) pre = node;
    else {
      if (node.val < pre.val) {
        val2 = node;
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
}
