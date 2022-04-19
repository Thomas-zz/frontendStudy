// 问打印顺序是？
var obj = {
  func: function () {
    setTimeout(function () {
      console.log("A");
    }, 0);
    return new Promise(function (resolve) {
      console.log("B");
      resolve();
    });
  },
};

setTimeout(() => {
  console.log("C");
}, 0);

obj.func().then(function(){
  console.log('D')
})

console.log('E')