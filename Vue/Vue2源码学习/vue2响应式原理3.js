let data = {
  name: "zhangjuan",
  age: 21,
  friends: {
    name: "xiaob",
    age: 21,
  },
};

function observe(target) {
  // 如果是一个普通属性
  if (typeof target !== "object" || target === null) {
    return target;
  }
  for (let key in target) {
    definedReactive(target, key, target[key]);
  }
}

function definedReactive(target, key, value) {
  // 深度监听
  observe(value);
  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      // 赋的新值可能是对象，也要深度监听
      observe(newValue)
      if (value !== newValue) {
        value = newValue;
        console.log("更新视图");
      }
    },
  });
}

observe(data);

console.log(data.name);
data.friends.name = "yuantou";
console.log(data.name);
