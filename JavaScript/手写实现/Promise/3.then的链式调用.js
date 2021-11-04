/*
1. 显然.then()需要返回一个Promise，这样才能找到then方法，所以我们会把then方法的返回值包装成Promise。
2. .then()的回调需要拿到上一个.then()的返回值
3. .then()的回调需要顺序执行，以上面这段代码为例，虽然中间return了一个Promise，但执行顺序仍要保证是1->2->3。我们要等待当前Promise状态变更后，再执行下一个then收集的回调，这就要求我们对then的返回值分类讨论
*/

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this._status = PENDING;
    this._resolveQueue = [];
    this._rejectQueue = [];

    let _resolve = (val) => {
      if (this._status !== PENDING) return;
      this._status = FULFILLED;
      while (this._resolveQueue.length) {
        const callback = this._resolveQueue.shift();
        callback(val);
      }
    };

    let _reject = (val) => {
      if (this._status !== PENDING) return;
      this._status = REJECTED;
      while (this._rejectQueue.length) {
        const callback = this._rejectQueue.shift();
        callback(val);
      }
    };

    executor(_resolve, _reject);
  }

  then(resolveFn, rejectFn) {
    return new MyPromise((resolve, reject) => {
      // 把resolveFn包装一下，再放进resolve执行队列，是为了额能够获取回调的返回值进行分类讨论
      const fulfilledFn = (value) => {
        try {
          let x = resolveFn(value);
          // 1. 如果是Promise，就继续.then等待状态变更,否则直接resolve
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };
      this._resolveQueue.push(fulfilledFn);

      const rejectedFn = (error) => {
        try {
          let x = rejectFn(error);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };
      this._rejectQueue.push(rejectedFn);
    });
  }
}

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("result1");
  }, 1000);
});

p1.then((res) => {
  console.log(res);
  return 2;
})
  .then((res) => {
    console.log(res);
    return 3;
  })
  .then((res) => {
    console.log(res);
  });
