/*
题目描述：
合并2个对象以及其子对象，返回一个新的对象
{ a: 1 }
{ a: 2 }
返回 { a: [1,2] }
示例1
{ a: 1 }
{ b: 1 }
返回{ a: 1, b: 1 }
示例2
{ a: [1] }
{ a: [2] }
返回{ a: [1,2] }
如果合并的对象类型不同则throw error
*/

function merge(obj1, obj2){
  let map = new Map();
  for(let key in obj1){
    map.set(key, (map.get(key) || []).push(obj1[key]))
  }
  for(let key in obj2){
    map.set(key, (map.get(key) || []).push(obj2[key]))
  }
  for(let val of map){
    console.log(val)
  }
}

merge({"a":1}, { "a": 2 })