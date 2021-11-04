const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this._status = PENDING;
    this.resolveQueue = [];
    this.rejectQueue = [];
    this._value = undefined;

    let _resolve = (val) => {
      
    };
  }
}
