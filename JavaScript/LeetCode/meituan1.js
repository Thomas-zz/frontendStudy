function fn(str){
  let count = 0;

  for(let i = 2; i <= str.length; i++){
    for(let j = 0; j + i <= str.length; j++){
      let num = parseInt(str.slice(j, j + i)) % 22;
      console.log(num);
      if(num === 0) count++;
    }
  }

  console.log(count);
}

fn('12221')