function fn(str, k){
  let max = 0;
  for(let i = 0; i < str.length; i++){
    let sum = 0;
    let num = k;

    for(let j = i; j < str.length; j++){
      if(str[j] === '1' || num-- > 0) {
        sum++;
      }else{
        break;
      }
    }

    max = Math.max(max, sum);
  }
  return max;
}

console.log(fn('0011001110110001111',3))