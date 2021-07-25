let fun = function (m, n) {
    // 定义矩阵的四个边界值
    let l = 0, r = m - 1;
    let t = 0, d = n - 1;

    while (true) {
        for (let a = t; a <= d; a++) {
            if (a != l) {
                console.log(a * m + l + 1);
            }
        }
        if (++l > r) break;
        for (let b = l; b <= r; b++) {
            if (b != d) {
                console.log(d * m + b + 1);
            }
        }
        if (--d < t) break;
        for (let c = d; c >= t; c--) {
            if (c != r) {
                console.log(c * m + r + 1);
            }
        }
        if (--r < l) break;
        for (let k = r; k >= l; k--) {
            if (k != t) {
                console.log(t * m + k + 1);
            }
        }
        if(++t > d) break;
    }

}

fun(3, 3);