function fn(num) {
  let res = "";
  let str = num.toString().split(".");
  let integer = str[0];
  let flag = false;
  if(integer[0] === '-'){
    integer = integer.slice(1);
    flag = true;
  }
  let count = 0;
  for (let i = integer.length - 1; i >= 0; i--) {
    count++;
    res = integer[i] + res;
    if (count % 3 === 0 && i !== 0) {
      res = "," + res;
    }
  }
  if (str[1]) {
    res = res + "." + str[1];
  }
  res = flag ? '-' + res : res;
  console.log(res);
}

fn(0);
