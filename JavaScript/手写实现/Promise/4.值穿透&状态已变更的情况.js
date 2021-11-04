/*
1. 值穿透：如果then()接收的参数不是function，那么我们应该忽略它，
2. 处理状态为resolve/reject的情况，我们上边 then() 的写法是对应状态为padding的情况，
但是有些时候，resolve/reject 在 then() 之前就被执行（比如Promise.resolve().then()），
如果这个时候还把then()回调push进resolve/reject的执行队列里，那么回调将不会被执行，
因此对于状态已经变为fulfilled或rejected的情况，我们直接执行then回调。
*/ 
// then方法
class MyPromise {
  constructor()

  then(resolveFn, rejectFn) {
    typeof resolveFn !== "function" ? resolveFn = value => value : null
    typeof rejectFn !== "function" ? rejectFn = reason => {
      throw new Error(reason instanceof Error ? reason.message : reason);
    } : null
    
    return new MyPromise((resolve, reject) => {
      const fulfilledFn = value => {
        try{
          let x = resolveFn(value)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        }catch(error){
          reject(error);
        }
      }

      const rejectedFn = error => {
        try{
          let x = resolveFn(error)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch(error){
          reject(error)
        }
      }

      switch(this._status){
        case PENDING:
          this.resolveQueue.push(fulfilledFn)
          this.rejectQueue.push(rejectedFn)
          break
        case FULFILLED:
          fulfilledFn(this._value)
          break;
        case REJECTED:
          rejectedFn(this._value);
          break;
      }
    })

  }
}
