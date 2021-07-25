var reverseWords = function(s) {
    let arr = s.split(' ');
    let result = [];
    for(let ele of arr){
        element = ele.split('');
        for(let left = 0, right = element.length-1; left <= right; left++, right--){
            [element[left], element[right]] = [element[right], element[left]];
        }
        let a = element.join('')
        result.push(a)
    }
    return result.join(' ');
};

console.log(reverseWords("Let's take LeetCode contest"))