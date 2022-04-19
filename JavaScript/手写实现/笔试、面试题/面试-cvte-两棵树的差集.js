function fn(tree1, tree2){
  let trace1 = [];
  let res = [];
  dfs(tree1);
  dfs(tree2);
  console.log(trace1);
  for(let i = 0; i < trace1.lenght; i++){
    let a = trace1.indexOf(trace1[i]);
    let b = trace1.indexOf(trace1[i], i + 1);
    if(b === -1){
      res.push(trace1[i]);
    }
  }
  return res;

  function dfs(node, trace = ''){
    if(!node) {
      trace1.push(trace);
      return ;
    };
    trace += node.val;
    dfs(node.left, trace);
    dfs(node.right, trace);
  }
}



function Tree(val){
  this.val = val;
  this.left = null;
  this.right = null;
}

let a = new Tree('a');
let b = new Tree('b');
let c = new Tree('c');
a.left = b;
b.left = c;

let a1 = new Tree('a');
let b1 = new Tree('b');
a1.left = b;

// let tree1 = {
//   a: {
//     parent: tree1,
//     child: null,
//   },
//   b: {
//     parent: tree1,
//     child: {
//       c: {
//         parent: b,
//         child: null,
//       }
//     }
//   }
// }

console.log(fn(a, a1));