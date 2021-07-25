// 投票算法
// 从第一个数开始，count=0,遇到相同的数就+1，遇到不同的数就-1，为0的时候就换个数重新开始计数
var majorityElement = function(nums) {
    let count = 1;
    let num = nums[0];
    for(let i = 1; i < nums.length; i++){
        if(num === nums[i]){
            count++;
        }else{
            count--;
            if(count === 0){
                num = nums[i];
                count++;
            }
        }
    }
    return num;
};