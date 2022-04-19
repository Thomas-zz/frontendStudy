const timer = (timer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
};

const promise1 = () => {
  return timer(200).then(() => {
    console.log(1);
    return 1;
  });
};

const promise2 = () => {
  return timer(300).then(() => {
    console.log(2);
    return 2;
  });
};

const promise3 = () => {
  return timer(100).then(() => {
    console.log(3);
    return 3;
  });
};

// // 补全代码
// function promiseAll() {

// }

function promiseAll(args) {
  let promise = Promise.resolve();
  let data = [];
  for (let item of args) {
    promise = promise.then(() => {
      return item().then((res) => {
        data.push(res);
      });
    });
  }
  return promise.then(() => {
    return data;
  });
}

promiseAll([promise1, promise2, promise3]).then((data) => {
  console.log("全部执行完成");
  console.log(data);
});

/*
要求输出
1
2
3
全部执行完成
[1,2.3]
*/

// async 写法
async function asyncPromiseAll(args) {
  let data = [];
  for (let promise of args) {
    let res = await promise();
    data.push(res);
  }
  return data;
}

asyncPromiseAll([promise1, promise2, promise3]).then((data) => {
  console.log("全部执行完成");
  console.log(data);
});
