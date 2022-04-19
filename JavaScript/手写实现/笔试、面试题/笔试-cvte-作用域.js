var x = 40;
function fn() {
  console.log(x);
}

var x = 10;
function show(f) {
  var x = 20;
  (function () {
    var x = 30;
    f();
  })();
}

show(fn);

// ------------------------------
var a = 1
function fun1() {
  var a = 10;
  function fun2() {
    a += 1;
    console.log(a);
  }
  fun2();
}
fun1();
a += 2;
console.log(a);
