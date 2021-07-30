var grayCode = function (n) {
    if (n === 0) {
        return [0];
    }
    let result = new Set();
    result.add(0);
    let code;
    for (let num = 0; num < Math.pow(2, n); num++) {
        let addnum = num + 1;
        code = num ^ addnum;
        if ((code &= code - 1) === 0) {
            result.add(addnum);
        }

        let minusnum = num - 1;
        code = num ^ minusnum;
        if ((code &= code - 1) === 0) {
            result.add(minusnum);
        }
    }
    return Array.from(result);
};

// 格雷编码的生成过程： G(i) = i ^ (i/2)
var grayCode = function (n) {
    let result = [];
    for(let i = 0; i < 1 << n; ++i){
        result.push(i ^ i >> 1);
    }
    return result;
};

console.log(grayCode(4));