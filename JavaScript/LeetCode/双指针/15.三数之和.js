
// 1.因为要保证结果数组不能有重复，而重复来源于两点：
//   1-数组是乱序的，不方便我们遍历
//   2-数组里有重复的数
// 2.解决这两个问题的方法很简单，首先进行排序
// 3.对排序的结果进行遍历，从0遍历到length-2为止，因为我们的结果是个三元组
// 4.对数组去重是比较麻烦的，一个等效的做法是如果当前数字等于前一个数字，则跳过这个数字
// 5.如果数字不同，设置start=i+1，end=length-1，查看i，start和end三个数的和比0大还是小
//   如果比0小，start++，如果比0大，end--，如果等于0，将结果加入数组
// 6.返回结果
var threeSum = function (nums) {
    nums.sort((a, b) => a - b);
    let length = nums.length;
    let arr = new Array();

    // 一个优化方法，三数和要等于0，除了三个0，一定是至少有一个数要小于0，所以可以只遍历到i<=0的情况
    // for(let i = 0; i < length -2 && nums[i] <= 0; i++)
    for (let i = 0; i < length - 2; i++) {
        if (i === 0 || nums[i] !== nums[i - 1]) {

            let start = i + 1, end = length - 1;
            while (start < end) {
                if (nums[start] + nums[end] + nums[i] < 0) {
                    start++;
                } else if (nums[start] + nums[end] + nums[i] > 0) {
                    end--;
                } else {
                    arr.push([nums[i], nums[start], nums[end]]);
                    start++;
                    end--;
                    // 去重
                    while (start < end && nums[start] === nums[start - 1]) {
                        start++;
                    }
                    while (start < end && nums[end] === nums[end + 1]) {
                        end--;
                    }
                }
            }
        }
    }
    return arr;
}
