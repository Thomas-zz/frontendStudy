function Person() {
    this.name = "jan";
    this.color = ["yellow","white"]
  }
  
  Person.prototype.getName = function () {
    console.log(this.name);
  };
  
  function Child() {
    this.name = "alice";
  }
  
  Child.prototype = new Person();
  
  var child1 = new Child();
  child1.color.push("black");
  child1.getName();
  var child2 = new Child();
  console.log(child2.color); //["yellow","white","black"]
  
  /*
  **重点：**让新实例的原型等于父类的实例
  
  特点：实例可以继承的属性有：实例的构造函数的属性、父类构造函数属性、父类原型的属性
  
  缺点：
  1. 原型上的引用属性会被所有实例共享
  2. 子类型在实例化时不能给父类构造函数传参
  3. 继承单一
  */
  