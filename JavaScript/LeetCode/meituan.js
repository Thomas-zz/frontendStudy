function fn(num){
  return dfs(num - 1);

  function dfs(num){
    if(num === 0) return 1;
    let count = 0;
    for(let i = 1; i <= num; i++){
      count += dfs(num - i);
    }
    return count;
  }
}

console.log(fn(9));