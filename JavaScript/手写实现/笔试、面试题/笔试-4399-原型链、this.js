function Fn(){
  var n = 20
  this.m = 20
  this.a = function(){
    console.log(this.m)
  }
}

var f1 = new Fn

Fn.prototype = {
  a:function(){
    console.log(this.m + 10)
  }
}

var f2 = new Fn

console.log(f1.constructor)
console.log(f2.constructor)
f1.a()
f2.a()
f2.__proto__.a()