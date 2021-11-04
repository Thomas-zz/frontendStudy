// 观察这段最简单的promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("result1");
  }, 500);
});

p1.then(
  (res) => console.log(res),
  (err) => console.log(err)
);

/* 
1. Promise的构造方法接收一个executor()，在new Promise()时就立刻执行这个executor回调
2. executor()内部的异步任务被放入宏/微任务队列，等待执行
3. then()被执行，收集成功/失败回调，放入成功/失败队列
4. executor()的异步任务被执行，触发resolve/reject，从成功/失败队列中取出回调依次执行

这种收集依赖 -> 触发通知 -> 取出依赖执行 的方式，被广泛运用于观察者模式的实现，
在Promise里，执行顺序是then收集依赖 -> 异步触发resolve -> resolve执行依赖
*/

class MyPromise {
  // 构造方法接受一个回调
  constructor(executor) {
    this._resolveQueue = []; // then收集的执行成功的回调队列
    this._rejectQueue = []; // then收集的执行失败的回调队列

    // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向, 否则找不到this._resolveQueue
    let _resolve = (val) => {
      while (this._resolveQueue.length) {
        const callback = this._resolveQueue.shift();
        callback(val);
      }
    };

    let _reject = (val) => {
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
