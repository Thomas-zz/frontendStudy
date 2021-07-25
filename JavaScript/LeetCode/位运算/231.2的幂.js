// 暴力，每次除以2
var isPowerOfTwo = function(n) {
    while(n !== 1){
        if(n % 2 !== 0)
            return false
        n = n >> 1;
    }
    return true;
}

var isPowerOfTwo = function(n) {
    return n > 0 && (n & n-1) === 0;
}

var isPowerOfTwo = function(n) {
    return n > 0 && (n & (-n)) === n;
}

console.log(isPowerOfTwo(16));
console.log(isPowerOfTwo(218));