// https://juejin.cn/post/6844904096525189128#heading-5

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this._status = PENDING;
    this._resolveQueue = [];
    this._rejectQueue = [];
    this._value = undefined;

    let _resolve = (val) => {
      // 为的是兼容executor是同步代码的情况
      const run = () => {
        if (this._status !== PENDING) return;
        this._status = FULFILLED;
        this._value = val;

        while (this._resolveQueue.length) {
          const callback = this.resolveQueue.shift();
          callback(val);
        }
      };
      // 实际上应该放到微任务里，但我们模拟，就放到宏任务里了
      setTimeout(run);
    };

    let _reject = (val) => {
      const run = () => {
        if (this._status !== PENDING) return;
        this._status = REJECTED;
        this._value = val;
        while (this._rejectQueue.length) {
          const callback = this._rejectQueue.shift();
          callback(val);
        }
      };
      setTimeout(run);
    };

    executor(_resolve, _reject);
  }

  then(resolveFn, rejectFn) {
    typeof resolveFn !== "function" ? (resolveFn = (value) => value) : null;
    // rejectFn抛出一个错误，如果
    typeof rejectFn !== "function"
      ? (rejectFn = (reason) => {
          throw new Error(reason instanceof Error ? reason.message : reason);
        })
      : null;

    return new MyPromise((resolve, reject) => {
      const fulfilledFn = (value) => {
        try {
          let x = resolveFn(value);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };

      const rejectedFn = (error) => {
        try {
          let x = rejectFn(error);
          x instanceof MyPromise ? x.then(resovle, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };

      switch (this._status) {
        case PENDING:
          this._resolveQueue.push(fulfilledFn);
          this._rejectQueue.push(rejectedFn);
          break;
        case FULFILLED:
          fulfilledFn(this._value);
          break;
        case REJECTED:
          rejectedFn(this._value);
          break;
      }
    });
  }
}

const p1 = new MyPromise((resolve, reject) => {
  resolve(1)          //同步executor测试
})

p1
  .then(res => {
    console.log(res)
    return 2          //链式调用测试
  })
  .then()             //值穿透测试
  .then(res => {
    console.log(res)
    return new MyPromise((resolve, reject) => {
      resolve(3)      //返回Promise测试
    })
  })
  .then(res => {
    console.log(res)
    throw new Error('reject测试')   //reject测试
  })
  .then(() => {}, err => {
    console.log(err)
  })

// 输出 
// 1 
// 2 
// 3 
// Error: reject测试
