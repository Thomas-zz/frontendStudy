let Iterator = function (obj) {
  let current = 0;

  let next = function () {
    current += 1;
  };

  let isDone = function () {
    return current >= obj.length;
  };

  let getCurrentItem = function () {
    return obj[current];
  };

  return {
    next,
    isDone,
    getCurrentItem,
    length: obj.length,
  };
};

// 判断两迭代对象是否相等
let compare = function (iterator1, iterator2) {
  if (iterator1.length !== iterator2.length) {
    console.log("iterator1 和 iterator2 不相等");
    return;
  }
  // 手动递归
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
      throw new Error("iterator1 和 iterator2 不相等");
    }
    iterator1.next();
    iterator2.next();
  }
  console.log("iterator1 和 iterator2 相等");
};

let iterator1 = Iterator([1, 2, 3, 4]);
let iterator2 = Iterator([1, 2, 3, 4]);

compare(iterator1, iterator2);
