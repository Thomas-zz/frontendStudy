var generateMatrix = function (n) {
    let left = 0, right = n - 1, top = 0, bottom = n - 1;
    let arr = new Array(n);
    for (let i = 0; i < n; i++) {
        arr[i] = new Array(n);
    }
    let num = 1;
    while (true) {
        for (let a = left; a <= right; a++) {
            arr[top][a] = num++;
        }
        // console.log(arr)
        if (++top > bottom) break;

        for (let b = top; b <= bottom; b++) {
            arr[b][right] = num++;
        }
        // console.log(arr)
        if (--right < left) break;

        for (let c = right; c >= left; c--) {
            arr[bottom][c] = num++;
        }
        // console.log(arr)
        if (--bottom < top) break;

        for (let d = bottom; d >= top; d--) {
            arr[d][left] = num++;
        }
        // console.log(arr)
        if (++left > right) break;

    }
    return arr;
};

console.log(generateMatrix(3));