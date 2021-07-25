var merge = function(nums1, m, nums2, n) {
    nums1.splice(m, nums1.length - m, ...nums2);
    nums1.sort(function(a, b) {
        return a - b;
    })
    return nums1;
};

console.log(merge([1,2,3,0,0,0], 3, [2,5,6], 3));
console.log(merge([1], 1, [], 0));
