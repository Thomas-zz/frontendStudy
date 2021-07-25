var search = function (nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;
        }
        // 右段是有序
        else if (nums[mid] < nums[right]) {
            // 目标值确实在右段中
            if (target <= nums[right] && target > nums[mid]) {
                left = mid + 1;
            } else {
                // 目标值不在右段中
                right = mid - 1;
            }
        } else {  // 左段是有序
            // 目标值确实在左段中
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                // 目标值在右段中
                left = mid + 1;
            }
        }
    }
    return -1;
};

console.log(search([1,3], 3));