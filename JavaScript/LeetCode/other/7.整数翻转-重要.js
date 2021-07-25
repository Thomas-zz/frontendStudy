// 方法一：利用js字符串操作可以实现反转，但并非最好方法

// 方法二：数学方法
/*
1.
// 弹出 x 的末尾数字 digit
digit = x % 10
x /= 10

// 将数字 digit 推入 rev 末尾
rev = rev * 10 + digit

2.
判断rev是否满足

−2^31 ≤ rev⋅10+digit ≤ 2^31 − 1

3.移项和分类讨论后可得到一个结论：
若 Math.pow(-2, 31) ≤ rev ≤ Math.pow(2, 31) - 1
则 rev 满足条件，否则返回0
*/
var reverse = function (x) {
    let rev = 0;
    while (x !== 0) {
        let digit = x % 10;
        // 两次位运算~~可以实现取整
        x = ~~(x / 10);

        rev = rev * 10 + digit;
        // 重点是这一步
        if (rev < Math.pow(-2, 31) || rev > Math.pow(2, 31) - 1) {
            return 0;
        }
    }
    return rev;
};

// console.log(reverse(123))
console.log(5/4)
console.log(~(5/4))
console.log(~~(5/4))
