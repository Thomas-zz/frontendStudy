function fn(n, m, arr) {
  let res = 0;
  let cur = 0;
  let map = new Map();
  let boom = false;
  let once = 0,
    max = 0;
  for (let i = 1; i <= n; i++) {
    map.set(i, 0);
  }
  for (let i = 1; i < m; i++) {
    if (arr[i] === arr[cur]) boom = true;
    if (boom) {
      res++;
      boom = false;
      max = 0;
      cur = cur + max;
      for (let i = 1; i <= n; i++) {
        map.set(i, 0);
      }
    }
    map.set(arr[i], i);
    max = Math.max(max, i - cur);
    once++;
  }
  return res;
}

console.log(fn(2, 4, [2, 1, 1, 2]));
