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
    this._resolveQueue.push(resolveFn);
    this._rejectQueue.push(rejectFn);
  }
}

const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("result2");
  }, 1000);
});

p2.then((res) => console.log(res));