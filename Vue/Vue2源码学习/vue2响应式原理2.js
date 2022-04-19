let data = {
  name: "zhangjuan",
  age: 21,
};

function observe(target) {
  // 如果是一个普通属性
  if (typeof target !== "object" || target === null) {
    return target;
  }
  for (let key in target) {
    definedReactive(target, key, target[key])
  }
}

function definedReactive(target, key, value) {
  // Object.defineProperty可以精确地添加或修改对象的属性
  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      if(value !== newValue){
        value = newValue
        console.log('更新视图')
      }
    },
  });
}

observe(data)

console.log(data.name);
data.name = "zyan";
console.log(data.name);
