// O(n2)的时间复杂度，不好
// var maxArea = function (height) {
//     let max = 0;
//     for (let i = 0; i < height.length; i++) {
//         for (j = i + 1; j < height.length; j++) {
//             var num = Math.min(height[i],height[j]) * (j - i);
//             if (max < num) {
//                 max = num;
//             }
//         }
//     }
//     return max;
// };

var maxArea = function (height) {
    let min = 0;
    let left = 0, right = height.length - 1;
    let sum = 0;
    while (left < right) {
        console.log(left + ',' + right)
        min = height[left] < height[right] ? height[left++] : height[right--];
        // 加1是为了抵消上面--带来的影响
        sum = min * (right - left + 1) < sum ? sum : min * (right - left + 1);
    }
    return sum;
}

console.log(maxArea([1,8,6,2,5,4,8,3,7]))