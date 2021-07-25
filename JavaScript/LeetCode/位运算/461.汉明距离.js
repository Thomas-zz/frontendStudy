var hammingDistance = function(x, y) {
    let res = x ^ y, count = 0;
    //位计数
    while(res !== 0){
        count += res & 1;
        res >>= 1;
    }
    return count;
};

// 解法二
var hammingDistance = function(x, y) {
    let res = x ^ y, count = 0;
    //位计数
    while(res !== 0){
        res &= res - 1;
        count++
    }
    return count;
};

console.log(hammingDistance(1, 4));