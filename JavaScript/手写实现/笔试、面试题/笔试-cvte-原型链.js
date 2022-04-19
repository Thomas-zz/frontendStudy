function P() {
  this.num = [1, 2, 3];
}

function S() {}
S.prototype = new P();
var s1 = new S();
var s2 = new S();
s1.num.pop();

console.log(s2.num);
console.log(s1.num);
