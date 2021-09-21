var countQuadruplets = function (nums) {
    let res = 0;
    let map = new Map();
    for (let i = 3; i < nums.length; i++) {
        for (let j = 2; j < i; j++) {
            for (let m = 1; m < j; m++) {
                for (let n = 0; n < m; n++) {
                    if (nums[n] + nums[m] + nums[j] === nums[i]) {
                        if (!map.get('' + n + m + j + i)) {
                            res++;
                            map.set('' + n + m + j + i, 1);
                        }
                    }
                }
            }
        }
    }
    return res;
};

console.log(countQuadruplets([28, 8, 49, 85, 37, 90, 20, 8]))