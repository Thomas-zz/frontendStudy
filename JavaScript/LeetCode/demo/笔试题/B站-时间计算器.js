
function calculateData(date, dos){
  date = date.split(' ').join('T') + 'Z';
  let myDate = new Date(date).getTime();
  let cal = dos.split(' ');
  let count = 0;
  
  for(let tag of cal){
    // 加操作还是减操作
    let add = tag[0] === '+' ? true : false;
    let flag = tag[tag.length - 1];
    let num = parseInt(tag.slice(1, -1));

    if(flag === 's'){
      count = add ? count + num : count - num;
    } else if(flag === 'm'){
      count = add ? count + num * 60 : count - num * 60;
    } else if(flag === 'h'){
      count = add ? count + num * 60 * 60 : count - num * 60 * 60;
    } else if(flag === 'd'){
      count = add ? count + num * 3600 * 24 : count - num * 3600 * 24;
    } else if(flag === 'W'){
      count = add ? count + num * 3600 * 24 * 7 : count - num * 3600 * 24 * 7;
    }
  }

  myDate += count * 1000;
  let res = new Date(myDate).toISOString();
  return res.split('T').join(' ').slice(0, -5);
}

console.log(calculateData('2021-09-13 00:00:00', '+5d'))