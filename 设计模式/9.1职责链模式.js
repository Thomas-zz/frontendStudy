// 先定义节点函数
let order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log("500元定金预购，得到一百优惠券");
  } else {
    return "nextSuccessor"; // 将请求推给下一个节点
  }
};

let order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log("200元定金预购，得到50优惠券");
  } else {
    return "nextSuccessor";
  }
};

let orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log("普通购买，无优惠券");
  } else {
    console.log("手机库存不足");
  }
};

// 定义职责链节点
let Chain = function (fn) {
  // 当前节点函数
  this.fn = fn;
  // 在链中的下一个节点
  this.successor = null;
};

// 指定链中的下一个节点
Chain.prototype.setNextSuccessor = function (successor) {
  return (this.successor = successor);
};

// 传递请求给某个节点
Chain.prototype.passRequest = function () {
  let ret = this.fn.apply(this, arguments);

  if (ret === "nextSuccessor") {
    // 将请求继续向后传递
    return (
      this.successor &&
      this.successor.passRequest.apply(this.successor, arguments)
    );
  }
  return ret;
};

// 将三个订单函数分别包装成职责链的节点
let chainOrder500 = new Chain(order500);
let chainOrder200 = new Chain(order200);
let chainOrderNormal = new Chain(orderNormal);

// 指定节点在职责链中的顺序，将节点连成链
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

// 请求只用传递给第一个节点
chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(2, true, 500);
chainOrder500.passRequest(3, true, 500);
chainOrder500.passRequest(1, false, 0);

