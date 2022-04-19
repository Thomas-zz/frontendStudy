const arrayProto = Array.prototype;

const arrayMethods = Object.create(arrayProto);
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
  arrayMethods[method] = function (...args) {
    const result = arrayProto[method].apply(this, args);
    const ob = this.__ob__;

    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
    }
    if (inserted) ob.observeArray(inserted);
    return result;
  };
});

class Observe {
  constructor(obj) {
    this.walk(obj);
  }

  walk(target) {
    let keys = Object.keys(target);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = target[key];
      definedReflect(target, key, value);
    }
  }
}

function definedReflect(target, key, value) {
  observe(target);
  Reflect.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        value = newValue;
        observe(newValue);
      }
    },
  });
}

function observe(obj) {
  if (
    Object.prototype.toString(obj) === "[object Object]" ||
    Array.isArray(obj)
  ) {
    new Observe(obj);
  }
}
