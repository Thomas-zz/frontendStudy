const arrayProto = Array.prototype;

const arrMethods = Object.create(arrayProto);
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
  arrMethods[method] = function (...args) {
    const result = arrayProto[method].apply(this, args);
    const ob = this.__ob__;

    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.splice(2);
    }
    if (inserted) ob.observeArray(inserted);
    console.log("更新视图");
    return result;
  };
});

class Observe {
  constructor(value) {
    Object.defineProperty(value, "__ob__", {
      value: this,
      enumerable: false,
      writable: true,
      configurable: true,
    });
    if (Array.isArray(value)) {
      value.__proto__ = arrMethods;
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  walk(data) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
  observeArray(items){
    for(let i = 0; i < items.length; i++){
      observe(items[i])
    }
  }
}

function defineReactive(data, key, value) {
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue === value) {
        return;
      }
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

console.log(data.arr);
data.arr = [1, 2, 3, 4];
data.arr.push(5);
console.log(data.arr);
data.arr[4] = 6;
console.log(data.arr);