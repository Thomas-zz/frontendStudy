var threeSumClosest = function (nums, target) {
    // 1. 对数组进行排序
    nums.sort((a, b) => {
        return a - b;
    })
    let sum;
    let result = nums[0] + nums[1] + nums[2];
    for (let i = 0; i < nums.length - 2; i++) {
        // 2. 先确定一个tag下标i，在i+1和nums.lenght之间用双指针遍历
        let tag = nums[i];
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            sum = nums[left] + nums[right] + tag;
            if (sum > target) {
                right--;
            } else if (sum < target) {
                left++;
            } else {
                // 当三数之和=target时，直接返回target，没有比这更接近target的三个数
                return target;
            }
            if (Math.abs(sum - target) < Math.abs(result - target)) {
                result = sum;
            }
        }
    }
    return result;
};

console.log(threeSumClosest([-1, 2, 1, -4], -1));