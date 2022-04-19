function calculate(str){
  let stack = [];
  let flag = '';
  let map = new Map();
  map.set(')', '(');
  map.set(']', '[');
  map.set('}', '{');

  for(let i = 0; i < str.length; i++){
    let cur = str[i];
    if(cur ===')' || cur === ']' || cur === '}'){
      let pop = stack.pop()
      while(pop !== map.get(cur)){
        flag = pop + flag;
        pop = stack.pop();
      }
      stack.push(eval(flag));
      flag = '';
    }else{
      stack.push(cur)
    }
  }
  flag = stack.join('');
  return eval(flag);
}

console.log(calculate('3+2*{1+2*[-4/(8-6)+7]}'))