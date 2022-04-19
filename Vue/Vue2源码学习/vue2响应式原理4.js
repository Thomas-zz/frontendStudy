let data = {
  name: "zhangjuan",
  age: 21,
  friends: {
    name: "xiaob",
    age: 21,
  },
  arr: [1, 2, 3],
};

const oldArrayPorto = Array.prototype;
const newArrayProto = Object.create(oldArrayPorto);
["push", "pop", "shift", "unshift", "splice"].forEach((methodName) => {
  newArrayProto[methodName] = function () {
    console.log("更新视图");
    oldArrayPorto[methodName].call(this, ...arguments);
  };
});

function observe(target) {
  // 如果是一个普通属性
  if (typeof target !== "object" || target === null) {
    return target;
  }
  
  if (Array.isArray(target)) {
    target.__proto__ = newArrayProto;
  }
  
  // for...in...有一点不好，想一下是哪一点
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
      observe(newValue);
      if (value !== newValue) {
        value = newValue;
        console.log("更新视图");
      }
    },
  });
}

observe(data);

console.log(data.arr);
data.arr.push(4);
console.log(data.arr);
