Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let res = [];
    let index = 0;
    let len = promises.length;
    if (len === 0) {
      resolve(res);
      return;
    }

    for (let i = 0; i < len; i++) {
      // 为什么不直接 promise[i].then, 因为promise[i]可能不是一个promise
      Promise.resolve(promises[i])
        .then((data) => {
          res[i] = data;
          index++;
          if (index === len) resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};
