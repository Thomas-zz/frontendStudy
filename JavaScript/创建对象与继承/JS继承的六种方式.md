# JS继承的六种方式

## 原型链继承

```javascript
        function Person(){
            this.name = 'Hello world';
        }

        Person.prototype.getName = function(){
            console.log(this.name);
        }

        function Child(){
            
        }

        Child.prototype = new Person();//重点
        var child1 = new Child();
        child1.getName(); // Hello world
```

**重点：**让新实例的原型等于父类的实例

特点：实例可以继承的属性有：实例的构造函数的属性、父类构造函数属性、父类原型的属性

缺点：

1. 父类构造函数上的属性是共享的
2. 子类型在实例化时不能给父类型传参
3. 继承单一

> 在现代引擎中，从性能的角度来看，我们是从对象还是从原型链获取属性都是没区别的。它们（引擎）会记住在哪里找到的该属性，并在下一次请求中重用它。并且引擎足够聪明，一旦有内容更改，它们就会自动更新内部缓存，因此，该优化是安全的。

## 盗用构造函数

```javascript
        function Person(){
            this.name = 'xiaoming';
            this.colors = ['red', 'blue', 'green'];
        }

        Person.prototype.getName = function(){
            console.log(this.name);
        }

        function Child(age){
            Person.call(this);    //重点看这里
            this.age = age
        }

        var child1 = new Child(23);
        var child2 = new Child(12);
        child1.colors.push('yellow');
        console.log(child1.name); // xiaoming
        console.log(child1.colors); // ["red", "blue", "green", "yellow"]
        console.log(child2.colors); // ["red", "blue", "green"]
```

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



## 组合继承（常用）

```javascript
       function Parent(name){  //构造函数模式
            this.name = name;
            this.colors = ['red', 'blue', 'green'];
        }

        Parent.prototype.getName = function(){
            console.log(this.name);  //原型模式
        }

        function Child(name,age){
            Parent.call(this,name);// 第二次调用 Parent()，盗用构造函数
            this.age = age;
        }

        Child.prototype = new Parent(); // 第一次调用 Parent()，原型链继承

        var child1 = new Child('xiaopao',18);
        var child2 = new Child('lulu',19);
```

**重点：**结合了两种模式，传参和复用

特点：

1. 可以继承父类原型上的属性，可以传参，可复用
2. 每个新实例引入的构造函数属性是私有的
3. 保留了instanceof操作符和isPrototypeOf()方法识别合成对象的能力

缺点：调用了两次父类构造函数（耗内存）



## 原型式继承

```javascript
//先封装一个函数容器，用来输出对象和承载继承的原型
//本质上是对传入的对象执行了一次浅复制
function content(obj){
    function F(){}
    F.prototype = obj;  //继承了传入的参数
    return new F();   //返回函数对象
}

var sup = new Person();   //拿到父类的实例
var sup1 = content(sup);
console.log(sup1.age);   //继承了父类函数的属性
```

**重点：**用函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象，Object.create()方法就是这个道理

特点：

1. 类似于复制一个对象，用函数来包装
2. 适用情况：
   - 你有一个对象，想在它的基础上再创建一个新的对象
   - 不需要单独创建构造函数，但仍需要在对象间共享信息的场合
   - 引用值始终会在相关对象间共享，这点和使用原型模式是一样的

缺点：

1. 所有实例都会继承原型上的属性
2. 无法实现复用（新实例属性都是后面添加的）



## 寄生式继承

```javascript
// 寄生式继承，有点难理解，建议先把前三个继承方式搞明白

function Parent(){}

let parent = new Parent(); // 创建了一个Parent的实例

function content(obj){  // 传入的是一个对象实例
  function F(){};
  F.prototype = obj;
  return new F();   // 这里返回的是一个函数的实例对象
}
// 仔细看，对比上一节不难发现，这本质就是原型式继承，只不过绕了几个弯

// 下面这个函数就是给原型式继承又套了个壳子，可以为子对象增加一些属性和功能
function childObject(obj){
  let child = content(obj);  //传入的是一个对象实例
  child.name = 'xiaoming';  //为新对象添加一些属性
  return child;
}

let child1 = childObject(parent);

console.log(typeof childObject);   //function
console.log(typeof child1);    //object
console.log(child1.name);    //xiaoming
```

**重点：**创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象

特点：适合主要关注对象，而不在乎类型和构造函数的场景

缺点：

1. 没用到原型，无法复用
2. 给对象添加函数会导致函数难以重用，与构造函数模式类似



## 寄生组合式继承（常用）

```javascript
//寄生
function content(obj){
    function F(){}
    F.prototype = obj;
    return new F();
}

var con = content(Person.prototype);

//组合
function Sub(){
    Person.call(this);  //继承了父类构造函数的属性
}//解决了组合式两次调用构造函数属性的缺点

//重点
Sub.prototype = con;   //继承了con实例
con.constructor =  Sub;   //一定要修复实例的constructor

var sub1 = new Sub();//Sub的实例就继承了构造函数属性，父类实例，con的函数属性
console.log(sub1.age);
```

基本思路：不通过调用父类构造函数给子类原型赋值，而是取得父类原型的一个副本

通俗的说就是使用寄生式继承来继承父类原型，然后将返回的新对象赋值给子类原型

- 不改变原型链，instanceof操作符和isPrototypeOf()方法正常有效
- 是引用类型继承的最佳模式

```javascript
function content(obj){
    function F(){}
    F.prototype = obj.prototype;
    return new F();
}

function inherit(superClass, subClass) {
    let e = content(superClass);
    subClass.prototype = e;
    subClass.prototype.constructor = subClass;
}
```

![image-20210426105858555](E:\frontendStudy\JavaScript\创建对象与继承\JS继承的六种方式.assets\image-20210426105858555.png)

## 类继承

```javascript
class Animal{
    constructor(name){
        this.speed = 0;
        this.name = name;
    }
    run(speed){
        this.speed = speed;
    }
    
    stop(){
        this.speed = 0;
        alert(`${this.name} stands still.`)
    }
}

class Rabbit extends Animal{
    hide(){
        alert(`${this.name} hides!`)
    }
    stop(){
        super.stop();   //调用父类的stop
        this.hide();
    }
}
```

