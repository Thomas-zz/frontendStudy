var isPowerOfTwo = function(n) {
    while(n){
        if(n % 2 !== 0)
            return false
        n = n >> 1;
    }
    return true;
}

console.log(isPowerOfTwo(8))
