var subsets = function(nums) {
    let result = [];
    let path = [];
    function backtracking(index){
        result.push(path.slice());
        for(let i = index; i < nums.length; i++){
            path.push(nums[i]);
            backtracking(i + 1);
            path.pop();
        }
    }
    backtracking(0);
    return result;
};

