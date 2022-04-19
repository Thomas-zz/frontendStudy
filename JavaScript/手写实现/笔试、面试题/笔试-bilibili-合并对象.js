function concat(obj1, obj2 = {}){
  let res = {};
  Object.keys(obj1).forEach(key => {
    if(typeof obj1[key] === 'object'){
      res[key] = concat(obj1[key],{})
      return;
    }
    if(!res[key]){
      res[key] = obj1[key]
    }
    else{
      res[key] = Array.isArray(res) ?  [...res[key]] : [res[key]]
      res[key].push(obj1[key])
    }
  })
  Object.keys(obj2).forEach(key => {
    if(!res[key]){
      res[key] = obj2[key]
    }
    else{
      res[key] = Array.isArray(res) ?  [...res[key]] : [res[key]]
      res[key].push(obj2[key])
    }
  })
  return res;
}

function fn(obj){
  Object.keys(obj).forEach(key => {
    if(Array.isArray(obj[key])){
      obj[key] = concat(obj[key][0], obj[key][1]);
    }
  })
  return obj;
}

console.log(fn(concat({ a: {c: 3} },{ a: {c: 3} })))