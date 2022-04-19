class Observe {
  constructor(value) {
    this.walk(value);
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
}

function defineReactive(data, key, value) {
  // 深度观测
  observe(value);
  Object.defineProperties(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue === value) {
        return;
      }
      // 赋的新值也要被监听
      observe(newValue)
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
