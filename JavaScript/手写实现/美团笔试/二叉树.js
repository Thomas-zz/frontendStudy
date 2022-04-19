function TreeNode (i){
  this.val = i;
  this.left = null;
  this.right = null;
}

let map = new Map();

let n = 6;
let nodeArr = [1,0,1,1,0,0]
let arr2 = [0,1,2,1,4,4]
let whiteCount = 0;
let blackCount = 0;
for(let i = 0; i < n; i++){
  let node = new TreeNode(nodeArr[i])
  map.set(i, node);
}

for(let i = 0; i < n; i++){
  if(map.get(i).val === 0){
    if(arr2.indexOf(i - 1) === -1){
      whiteCount++;
    }else{
      if(map.get(arr2.indexOf(i - 1)).val === 1){
        whiteCount++;
      }
    }
  }else{
    if(arr2.indexOf(i - 1) === -1){
      blackCount++;
    }else{
      if(map.get(arr2.indexOf(i - 1)).val === 0){
        blackCount++;
      }
    }
  }
}