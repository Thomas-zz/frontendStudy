let mult = function (...args) {
  console.log("计算乘积");
  let a = 1;
  for (let i = 0; i < args.length; i++) {
    a *= args[i];
  }
  return a;
};

console.log(mult(2, 3));
console.log(mult(2, 3, 4, 5));

let proxyMult = (function () {
  let cache = {};
  return function (...args) {
    let arg = args.join(',')
    if (arg in cache) {
      return cache[arg];
    }
    cache[arg] = mult.apply(this, args)
    return cache[arg];
  };
})();

console.log(proxyMult(1, 2, 3, 4, 5, 6));
console.log(proxyMult(1, 2, 3, 4, 5, 6));
