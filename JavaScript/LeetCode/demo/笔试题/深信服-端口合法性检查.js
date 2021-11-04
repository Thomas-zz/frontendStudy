function checkport(port){
  let myPort = port.split(',');
  // let portArr = [];

  let check = [];
  let max = new Set();
  for(let i = 0; i < myPort.length; i++){
    check = myPort[i].split('-').map(a => {
      return parseInt(a);
    });
    if(check.length === 1){
      if(check[0] < 0 || check[0] > 65535) return false;
      max.add(check[0]);
    }else{
      if(check[0] > check[1]) return false;
      if(check[0] < 0 || check[1] > 65535) return false;
      for(let i = check[0]; i <= check[1]; i++){
        max.add(i);
      }
    }
    // portArr.push(...check);
  }
  console.log(max.size);

  return max.size <= 1024;

  // console.log(check)

  // portArr = portArr.map(a => {
  //   return Number(a);
  // })

  // portArr.sort((a, b) => {
  //   return a - b;
  // })

  // if(portArr[portArr.length - 1] > 65535 || portArr[0] < 1) return false;
  // if(portArr[portArr.length - 1] - portArr[0] + 1 > 1024) return false;

  // return true;
}

console.log(checkport('48,df'));