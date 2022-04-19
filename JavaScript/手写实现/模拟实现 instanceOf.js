function find(L, R) {
  let prototype = R.prototype;
  L = Object.getPrototypeOf(L);

  while (true) {
    if (L === null) {
      return false;
    }
    if (L === prototype) {
      return true;
    }
    L = Object.getPrototypeOf(L);
  }
}

console.log(find([1, 2], Array));
console.log(find([1, 2], Function));
