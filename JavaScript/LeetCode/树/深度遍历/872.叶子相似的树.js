// 用后序深度遍历拿到二叉树的叶子节点，然后比较

var leafSimilar = function (root1, root2) {
    const seq1 = [];
    if (root1) {
        dfs(root1, seq1);
    }

    const seq2 = [];
    if (root2) {
        dfs(root2, seq2);
    }

    return seq1.toString() === seq2.toString();
};

var dfs = function (root, seq) {
    if (!root.left && !root.right) {
        seq.push(root.val);
    } else {
        if (root.left !== null) {
            dfs(root.left, seq);
        }
        if (root.right !== null) {
            dfs(root.right, seq);
        }
    }
}