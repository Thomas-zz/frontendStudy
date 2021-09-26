function newOperator(ctor){
  if(typeof ctor !== 'function'){
    throw "newOperator function the frist param must be a function";
  }

  // ES5 new.target 要指向构造函数
  newOperator.target = ctor;

  var newObj = Object.create(ctor.prototype);

  // 接收除第一个参数外的剩余参数
  var argsArr = [].slice.call(arguments, 1);

  // new出来的新对象要绑定到调用的构造函数的this
  // 这里还有一个重要作用是拿到ctor函数的返回结果
  var returnResult = ctor.apply(newObj, argsArr);

  // 如果返回结果是引用类型，则返回这个结果（注意，typeof null === object）
  // 否则就返回我们新建的这个对象就可以
  return typeof returnResult === 'object' ? returnResult || newObj : newObj;
}

// ------------------------------验证----------------------------
function Student(name, age){
  this.name = name;
  this.age = age;
  // this.doSth();
  // return Error();
}
Student.prototype.doSth = function() {
  console.log(this.name);
};
var student1 = newOperator(Student, '你', 18);
var student2 = newOperator(Student, '好', 18);
console.log(student1, student1.doSth()); 
console.log(student2, student2.doSth()); 

console.log(student1.__proto__ === Student.prototype); // true
student2.__proto__ === Student.prototype; // true
// __proto__ 是浏览器实现的查看原型方案。
// 用ES5 则是：
Object.getPrototypeOf(student1) === Student.prototype; // true
Object.getPrototypeOf(student2) === Student.prototype; // true
