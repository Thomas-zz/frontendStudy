// 1. 乞丐版
JSON.parse(JSON.stringify(obj))

// 2. 考虑对象，浅拷贝
function clone(target) {
  let cloneTarge = {};
  for (let key in target) {
    cloneTarge[key] = target[key];
  }
  return cloneTarget;
}

// 3. 深拷贝
function clone(target) {
  if (typeof target === 'object') {
    let cloneTarge = {};
    for (const key in target) {
      cloneTarge[key] = clone(target[key]);
    }
    return cloneTarge;
  } else {
    return target;
  }
}

// 4. 考虑数组的情况
function clone(target) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (let key in target) {
      cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}

//  5. 考虑循环引用
function clone(target, map = new Map()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return target;
    }
    map.set(target, cloneTarget);
    for(let key in target){
      cloneTarget[key] = clone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}

// 6. 使用WeakMap()
function clone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return target;
    }
    map.set(target, cloneTarget);
    for(let key in target){
      cloneTarget[key] = clone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}