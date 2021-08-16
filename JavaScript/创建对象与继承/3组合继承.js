function Animal(name){
    this.name = name;
    this.color = ['yellow','black'];
}

Animal.prototype.getColor = function() {
    console.log(this.color);
}

function Dog(name,age) {
    Animal.call(this, name);  //第二次调用父类的构造函数
    this.age = age;
}

Dog.prototype = new Animal();  //第一次调用父类的构造函数
Dog.prototype.constructor = Dog;

let dog = new Dog('wangwang',22);
dog.getColor();
console.log(dog);