function Animal(name) {
    this.name = name;
    this.color = ['yellow', 'blue'];
}

Animal.prototype.getName = function () {
    console.log(this.name);
}

function Dog(name){
    Animal.call(this, name);
    this.voice = "wang";
}

//-----------------------------------------------
// function content(obj){
//     function F(){};
//     F.prototype = obj.prototype;
//     return new F();
// }

// function inherit(superClass, subClass) {
//     let e = content(superClass);
//     subClass.prototype = e;
//     subClass.prototype.constructor = subClass;
// }

// inherit(Animal, Dog);
//-----------------------------------------------

// 这两句和上面一大段的代码等价
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
//-----------------------------------------------

let dog = new Dog('wangwang');
console.log(dog);
dog.getName();
