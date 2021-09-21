function fn(nums) {
  for (let i = 0; i < n; i++) {
    let num = parseInt(readline());
    let k = num >> 2;
    let res = 0;
    let set = new Set();
    for (let j = 1; j < k; j + 2) {
      let numb = num % j;
      if (numb === 0 && !set.has(numb)) {
        res++;
        set.add(numb);
      }
    }
    print(res);
  }
}

fn([])