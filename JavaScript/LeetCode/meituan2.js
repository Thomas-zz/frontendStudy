// function fn(n, m, p){
//   let map = new Map();
  // for(let i = 1; i <= n; i++){
  //   map.set(i, 0);
  // }

  // for(let j = 1; j <= m; j++){
  //   let num = [];
  //   map.set(num[0], map.get(num[0]) + 1);
  //   map.set(num[1], map.get(num[1]) + 1);
  // }

  // for(let i = 1; i <= p; i++){
  //   let arr = [];
  //   let num = map.get(arr[0]);
  //   map.set(arr[0], map.get(arr[1]));
  //   map.set(arr[1], num);
  // }

  for(let j = 1; j <= m; j++){
    let num = read_line().split(' ');
    let num1 = num[0];
    let num2 = num[1];
    if(map.has(num1))    map.set(num1, map.get(num1) + 1);
    else map.set(num1, 0);
    if(map.has(num2))    map.set(num2, map.get(num2) + 1);
    else map.set(num2, 0);
  }

//   let res = [];
//   for(let i = 1; i <= n; i++){
//     res.push(map.get(i));
//   }
//   print(res.concat(' '));
// }


// -------------
let line = read_line().split(' ');
let n = parseInt(line[0]);
let m = parseInt(line[1]);
let q = parseInt(line[2]);

let map = new Map();
  for(let i = 1; i <= n; i++){
    map.set(''+i, 0);
  }

  for(let j = 1; j <= m; j++){
    let num = read_line().split(' ');
    map.set(num[0], map.get(num[0]) + 1);
    map.set(num[1], map.get(num[1]) + 1);
  }


  for(let i = 1; i <= q; i++){
    let arr = read_line().split(' ');
    let num = map.get(arr[0]);
    map.set(arr[0], map.get(arr[1]));
    map.set(arr[1], num);
  }

  let res = [];
  for(let i = 1; i <= n; i++){
    res.push(map.get(''+i));
  }
  print(res.join(' '))

  // ------------

let map = new Map();
map.set(0, 1);
map.set(1, 2);
map.forEach((value, key) => {
  console.log(value)
})