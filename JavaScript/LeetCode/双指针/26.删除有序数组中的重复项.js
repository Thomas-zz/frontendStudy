// var removeDuplicates = function(nums) {
//     if(nums.length <= 1){
//         return nums.length;
//     }
//     let front = 0, middle = 1, behind = 1;
//     while(behind < nums.length){
//         if(nums[behind] === nums[front]){
//             behind ++;
//         }
//         if(nums[behind] !== nums[front]){
//             // 交换两个的值
//             nums[middle] = nums[middle] ^ nums[behind];
//             nums[behind] = nums[middle] ^ nums[behind];
//             nums[middle] = nums[middle] ^ nums[behind];
//             front++;
//             middle++;
//             behind++;
//         }
//     }
//     return front + 1;
// };

var removeDuplicates = function (nums) {
    if (nums.length <= 1) {
        return nums.length;
    }
    let front = 0, behind = 1;
    while (behind < nums.length) {
        if (nums[front] == nums[behind] || nums[front] > nums[behind]) {
            behind++;
        } else {
            // 交换两个指针下的值
            front++;
            nums[front] =nums[behind];
            behind++;
        }
    }
    return front + 1;
};

// console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]));
console.log(removeDuplicates([1, 2]));
