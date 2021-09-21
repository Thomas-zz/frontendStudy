function canBePalindromicString( str1 ) {
  let len = str1.length;
  if(len < 2) return 0;

  let i = 0, j = 1;
  while(j < len){
    let str = str1[i] + str1[j];

    for(let n = -1; n <= len; n++){
      let str2 = str1.splice(0, n) + str + str1.splice(n, -1)
    }
  }
}

canBePalindromicString("abca")