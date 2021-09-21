function find_kth(arr1, arr2, k) {
  let i = 0, j = 0;
  while (i < arr1.length) {
    if (arr1[i] <= arr2[j]) {
      if (--k < 1) return arr1[i];
      i++;
    }
    else {
      if (--k < 1) return arr2[j];
      j++;
    }
  }
  while (j < arr2.length) {
    if (--k < 1) return arr2[j];
    j++;
  }
}

function find_kth(arr1, arr2, k) {
  let l1 = 0, r1 = arr1.length - 1;
  let mid1 = l1 + ((r1 - l1) >> 1);
  let i = 0;
  let num = mid1 + i + 2;

  while (num !== k || mid1 !== arr1.length) {
    if (arr1[mid1] > arr2[i]) {
      if (num < k) {
        i++;
      } else {
        r1 = mid1 - 1;
        mid1 = l1 + ((r1 - l1) >> 1);
      }
    } else {
      if(num < k){
        l1 = mid1 + 1;
        mid1 = l1 + ((r1 - l1) >> 1);
      }else{
        r1 = mid1 - 1;
        mid1 = l1 + ((r1 - l1) >> 1);
      }
    }
    num = mid1 + i + 2;
  }
  while(num < k){
    i++;
    num++;
  }

  return arr1[mid1] >= arr2[i] ? arr1[mid1] : arr2[i];
}

console.log(find_kth([1, 2, 3], [4, 5, 6], 4))