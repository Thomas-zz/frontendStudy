// 盗用构造函数继承
function Person(name){
    this.name = name,
    this.color = ['green', 'blue'];
  }
  
  Person.prototype.getName = function(){
    console.log(this.name);
  }
  
  function Child(age){
    Person.call(this, "xiaoming");   //在这里，盗用了构造函数
    this.age = age;
  }
  
  var child1 = new Child(21);
  var child2 = new Child(28);
  child2.color.push('yellow');
  
  // 继承了父类构造函数的属性
  console.log(child1.color);
  console.log(child2.color);
  
  console.log(child1.name);
  
  // 没有继承父类原型的属性，必须在构造函数中定义方法，因此所有类型都只能使用构造函数模式
  child1.getName();   //error
  
  /*
  **重点：**用call()和apply()方法以新创建的对象为上下文执行构造函数
  
  特点：
  1. 只继承了父类构造函数的属性，没有继承父类原型的属性
  2. 可以继承多个构造函数属性（call多个）
  3. 在子实例中可以向父实例传参
  
  缺点：
  1. 只能继承父类构造函数的属性
  2. 不能访问父类原型上定义的方法，必须在构造函数中定义方法，因此所有类型都只能使用构造函数模式
  3. 无法实现构造函数的复用（每次用都要重新调用）
  4. 每个新实例都有父类构造函数的副本，臃肿
  */