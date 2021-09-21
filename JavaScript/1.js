function fn(arr, target){
    let res = 0;
    for(let i = 0; i < arr.length; i++){
        for(let j = i + 1; j < arr.length; j++){
            if(arr[i] + arr[j] <= target) res++;
        }
    }

    return res;
}

console.log(fn([-1,-1,7], 9));