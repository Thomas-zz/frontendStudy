function format(str){
  // console.log(str)
  if(!str) return 'SANGFOR';

  let myStr = [];
  let start = 0, end = 0;
  for(let i = 0; i < str.length; i++){
    myStr = [str[i]];
    start = i;
    while(str[i] === str[i+1]){
      i += 1;
      myStr.push(str[i]);
      end = i;
    }
    if(myStr.length !== 1) break;
  }

  if(myStr.length === 1) return str;

  console.log(str[start] + myStr.join('') + str[end])
  start = start > 0 ? start : 0;
  end = end < str.length ? end : str.length;
  return myStr.length >= 3 ? format(str.replace(str[start - 1] + myStr.join('') + str[end + 1], '')) : format(str.replace(myStr.join(''), ''));

}

console.log(format('aabbcccdddaacca'))