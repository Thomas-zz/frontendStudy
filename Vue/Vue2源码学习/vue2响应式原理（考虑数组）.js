const arrayProto = Array.prototype;

const arrayMethos = Object.create(arrayProto);
let methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "reverse",
  "sort",
];
methodsToPatch.forEach((method) => {
  arrayMethos[method] = function (...args) {
    const result = arrayProto[method].apply(this, args);
    const ob = this.__ob__;

    // 数组有新增属性的操作
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        // 取到splice要新增的属性
        inserted = args.slice(2);
    }
    // 如果有新增的元素，对新增元素的每一项进行观测
    if (inserted) ob.observeArray(inserted);
    console.log("更新视图");
    return result;
  };
});

class Observe {
  constructor(value) {
    // 可以根据这个属性来防止已经被响应式观察的数据反复被观测
    // 其次 响应式数据可以使用__ob__来获取 Observer 实例的相关方法
    Object.defineProperty(value, "__ob__", {
      // 指代的就是Observer的实例
      value: this,
      // 不可枚举
      enumerable: false,
      writable: true,
      configurable: true,
    });
    if (Array.isArray(value)) {
      // 重写数组原型方法来对数组操作进行拦截
      value.__proto__ = arrayMethos;
      // 如果数组里面包含数组，对象，需要递归判断
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  walk(data) {
    // 用forEach也可以，但不能用for...in...
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i]);
    }
  }
}

function defineReactive(data, key, value) {
  // 深度观测
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue === value) {
        return;
      }
      // 赋的新值也要被监听
      observe(newValue);
      console.log("更新视图");
      value = newValue;
    },
  });
}

function observe(value) {
  if (
    Object.prototype.toString.call(value) === "[object Object]" ||
    Array.isArray(value)
  ) {
    return new Observe(value);
  }
}

let data = {
  name: "zhangjuan",
  age: 21,
  friends: {
    name: "xiaob",
    age: 21,
  },
  arr: [1, 2, 3],
};

observe(data);

// console.log(data.name)
// data.name = 'zyan'
// console.log(data.name)

// console.log(data.friends.age)
// data.friends.age = 22
// console.log(data.friends.age)

// data.friends = {
//   name: "yuantou",
//   age: 22,
// };
// data.friends.name = 'along'

console.log(data.arr);
data.arr = [1, 2, 3, 4];
data.arr.push(5);
console.log(data.arr);
data.arr[4] = 6;
console.log(data.arr);

// 完美啊
