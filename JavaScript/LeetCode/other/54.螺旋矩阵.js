
// 定义上下左右的矩阵边界，每次遍历一行/列后修改矩阵边界
var spiralOrder = function (matrix) {
    let t = 0, b = matrix.length - 1;
    let l = 0, r = matrix[0].length - 1;
    let arr = [];
    while (true) {
        for (let i = l; i <= r; i++) {
            arr.push(matrix[t][i]);
        }
        if (++t > b) {
            break;
        }
        for (let j = t; j <= b; j++) {
            arr.push(matrix[j][r]);
        }
        if (--r < l) {
            break;
        }
        for (let k = r; k >= l; k--) {
            arr.push(matrix[b][k]);
        }
        if (--b < t) {
            break;
        }
        for (let m = b; m >= t; m--) {
            arr.push(matrix[m][l])
        }
        if (++l > r) {
            break;
        }
    }
    return arr;
};