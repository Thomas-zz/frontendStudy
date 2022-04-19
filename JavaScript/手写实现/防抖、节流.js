function debounce(fn, wait, immediate) {
  let timer = null;
  return function (...args) {
    let that = this;
    if (timer) clearTimeout(timer);

    // immediate 为 true 表示第一次触发后执行
    // timer 为空表示首次触发
    if (immediate && !timer) {
      fn.apply(that, args);
    }

    timer = setTimeout(() => {
      fn.apply(that, args);
    }, wait);
  };
}

function throttle(fn, delay) {
  let timer = 0;
  return function (...args) {
    let now = new Date();
    if (now - timer < delay) return;
    timer = now;
    fn.apply(this, args);
  };
}

let a = new Date();
setTimeout(() => {
  console.log(new Date() - a);
}, 1000);

function Debounce(fn, time) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    let that = this;
    timer = setTimeout(() => {
      fn.apply(that, args);
    }, time);
  };
}
