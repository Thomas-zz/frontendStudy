// 输入 n，生成 1 到 n - 1 个数字，从第一个开始，每第 k 个数字就删除，返回最后剩下的数字

function search(n, k) {
  // todo
    let arr = [];
    let flag = 0, num = 1;
    for(let i = 1; i<=n; i++){
        arr.push(i);
    }
    while(n > 0){
        if(arr[flag] === -1) continue;
        if(num % k === 0) {
          if(n === 1) return arr[flag];
          arr[flag] = -1;
          n--;
        }
        num++;
        console.log(n);
        flag = (flag + 1) % (arr.length - 1);
    }

  }

  console.log(search(3, 2))