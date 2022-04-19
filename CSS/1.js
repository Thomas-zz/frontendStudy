function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child(name) {
  Parent.call(this, name);
  this.age = 18;
}

function content(obj) {
  function F() {}
  F.prototype = obj.prototype;
  return new F();
}

function inherit(superClass, subClass) {
  subClass.prototype = content(superClass);
  subClass.prototype.constructor = subClass;
}

inherit(Parent, Child);
let child = new Child("child");
console.log(child.getName());
console.log(child.age);
