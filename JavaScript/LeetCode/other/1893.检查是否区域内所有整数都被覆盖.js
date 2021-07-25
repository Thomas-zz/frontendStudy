// 不是很聪明的暴力 O(n^2)
var isCovered = function (ranges, left, right) {
    for (let m = 0; m < ranges.length; m++) {
        for (let i = 0; i < ranges.length; i++) {
            if (ranges[i][0] <= left) {
                if (left <= ranges[i][1]) {
                    left = ranges[i][1] + 1;
                }
            }
        }
    }
    return left > right;
};

// 基于排序，时间复杂度为快排的时间复杂度，O(nlog(n))
var isCovered = function (ranges, left, right) {
    ranges.sort((a, b) => {
        return a[0] - b[0];
    })
    for (let i = 0; i < ranges.length; i++) {
        if (ranges[i][0] <= left) {
            if(left > right) return true;
            if (left <= ranges[i][1]) {
                left = ranges[i][1] + 1;
            }
        }
    }
    return left > right;
};

// 差分数组
var isCovered = function (ranges, left, right) {
    let arr = new Array(52).fill(0);
    for (let [l, r] of ranges) {
        arr[l]++;
        arr[r + 1]--;
    }
    
    // 前缀和
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        sum += arr[i];
        // 在left到right这个区间内
        if(left <= i && i <= right && sum === 0) return false;
    }
    return true;
};

console.log(isCovered([[1, 10], [10, 20]], 21, 21))