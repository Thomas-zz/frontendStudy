function formatDate(date, str){
  date = date.split(' ');
  let myDate = date[0].split('-');
  let myTime = date[1].split(':');

  const map = new Map();
  map.set('Y', myDate[0]);
  map.set('m', myDate[1]);
  map.set('d', myDate[2]);
  map.set('H', myTime[0]);
  map.set('i', myTime[1]);
  map.set('s', myTime[2]);

  let res = [];
  for(let i = 0; i < str.length; i++){
    res.push(map.get(str[i]) || str[i]);
  }

  return res.join('');
}

console.log(formatDate('1997-07-01 00:01:59', 'xxxHyyyizzzs'))