# fighting for wealth-第一周

## DAY1

### 1.CSS和JS是否阻塞DOM渲染与解析

- CSS不会阻塞DOM解析，但会阻塞DOM渲染，因为CSS会阻塞render tree的生成，进而会阻塞DOM的渲染
- JS会阻塞DOM解析，所以一般将JS放在body后面
- CSS会阻塞JS的执行。设想`JS`脚本中的内容是获取`DOM`元素的`CSS`样式属性，如果`JS`想要获取到`DOM`最新的正确的样式，势必需要所有的`CSS`加载完成，否则获取的样式可能是错误或者不是最新的。因此要等到`JS`脚本前面的`CSS`加载完成，`JS`才能再执行。
- 浏览器遇到<script>标签且没有defer或async属性时会触发页面渲染

### 2.xx和xx的区别

#### 2.1 箭头函数和普通函数的区别

1. 语法样式不同，箭头函数有其简写
2. 箭头函数会捕获其所在上下文的this值作为自己的this值，并且this指向永远不会改变
3. 所以不能用作构造函数，也不能使用new关键字
4. call、bind、apply也不会影响其this指向
5. 没有原型prototype
6. 没有自己的arguments，在箭头函数中访问的arguments实际上获得的是外层局部（函数）执行环境中的值
7. 不能当做Generator函数，不能使用yield关键字

#### 2.2 var，let和const的区别

1. **作用域**：var是全局变量，只有函数作用域，没有块作用域；后两个有块级作用域

2. **变量提升**：三个都会变量提升，但let和const有暂时性死区，在没有到其赋值时，之前就不能使用，使用则会报错。var在声明前使用时值为undefined

3. **声明方面**：var允许重复声明变量，let和const在同一作用域不允许重复声明变量。因const声明的是常量，其声明时一定要赋值，否则报错。

4. 如果const声明了一个对象，对象里的属性是可以改变的。

   ```
   const obj={name: 蟹黄 };
   obj.name= 同学 ;
   console.log(obj.name);//同学
   ```

   因为const声明的obj只是保存着其对象的**引用地址**，只要地址不变，就不会出错。

   使用`Object.freeze(obj)` 冻结obj,就能使其内的属性不可变,但它有局限，就是obj对象中要是有属性是对象，该对象内属性还能改变，要全不可变，就需要使用递归等方式一层一层全部冻结。

#### 2.3 Bigint和Number的区别

Number类型的数字**有精度限制**，数值的精度只能到 53 个二进制位（相当于 16 个十进制位, `正负9007199254740992`），大于这个范围的整数，就无法精确表示了。

Bigint**没有位数的限制，任何位数的整数都可以精确表示**。但是其只能用于表示整数，且为了与Number进行区分，BigInt 类型的数据必须添加后缀n。BigInt 可以使用负号（-），但是不能使用正号（+）。

另外number类型的数字和Bigint类型的数字**不能**混合计算。

```
12n+12;//报错
```

#### 2.4 defer和async的区别

在script标签内有这两个属性async和defer，例如<script src="./home.js" async defer></script>

- defer：意为延迟，表示脚本会被延迟到整个页面都解析完毕再运行，有先后顺序
- async：意为异步，不保证顺序，目的是不让页面等待脚本下载和执行

#### 2.5 get和post的区别

1. get参数在URL中**？**后面，且用**&**分隔参数，通过地址栏传值；而post将信息存放在在`Message Body` 中，通过提交表单传值

2. GET请求的内容会被浏览器缓存起来，而POST请求返回的内容不会被浏览器缓存

3. 对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200(返回数据);

   而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok(返回数据)。

   - 并不是所有浏览器都会在POST中发送两次包，Firefox就只发送一次。

4. 其实都不安全，但get记录会保存在浏览器，访问记录中，post相比会更安全一点

5. get的好处：便于分享，简单

#### 2.6 用框架和不用框架的区别

**框架的好处**

- 帮助开发者做了很多事情，开发者只需关注业务逻辑
- 组件化
- 天然分层： JQuery 时代的代码大部分情况下是面条代码,耦合严重,现代框架不管是 MVC、MVP还是MVVM 模式都能帮助我们进行分层，代码解耦更易于读写。
- 生态：具有成熟的解决方案

**框架缺点**

- 代码臃肿，封装了很多不必要的功能和组件
- 更新迭代快，需要学习成本

**Vue和React的区别：**

`react整体是函数式的思想`，把组件设计成纯组件，状态和逻辑通过参数传入，所以在react中，是单向数据流；

`vue的思想是响应式的`，也就是基于是数据可变的，通过对每一个属性建立Watcher来监听，当属性变化的时候，响应式的更新对应的虚拟dom。

#### 2.7 cookies和session的区别

a. `存储位置不同:`cookie的数据信息存放在客户端浏览器上，session的数据信息存放在服务器上。

b. `存储容量不同:`单个cookie保存的数据<=4KB，一个站点最多保存20个Cookie，而对于session来说并没有上限，但出于对服务器端的性能考虑，session内不要存放过多的东西，并且设置session删除机制。

c. `存储方式不同:`cookie中只能保管ASCII字符串，并需要通过编码方式存储为Unicode字符或者二进制数据。session中能够存储任何类型的数据，包括且不限于string，integer，list，map等。

d. `隐私策略不同:`cookie对客户端是可见的，别有用心的人可以分析存放在本地的cookie并进行cookie欺骗，所以它是不安全的，而session存储在服务器上，对客户端是透明的，不存在敏感信息泄漏的风险。

e. `有效期上不同:`开发可以通过设置cookie的属性，达到使cookie长期有效的效果。session依赖于名为JSESSIONID的cookie，而cookie JSESSIONID的过期时间默认为-1，只需关闭窗口该session就会失效，因而session不能达到长期有效的效果。

f. `服务器压力不同:`cookie保管在客户端，不占用服务器资源。对于并发用户十分多的网站，cookie是很好的选择。session是保管在服务器端的，每个用户都会产生一个session。假如并发访问的用户十分多，会产生十分多的session，耗费大量的内存。

g. `跨域支持上不同:`cookie支持跨域名访问(二级域名是可以共享cookie的)。session不支持跨域名访问。

#### 2.8 宏任务和微任务的区别

### Generator函数的含义和用法

一、异步编程的方法：

- 回调函数
- 事件监听
- 发布/订阅
- Promise对象

二、回调函数的概念

回调函数能处理异步问题，但当有多个回调函数嵌套时，就会出现多重嵌套，代码将不是纵向发展而是横向发展

```js
fs.readFile(fileA, function (err, data) {
  fs.readFile(fileB, function (err, data) {
    // ...
  });
});
```

这种情况被称为回调函数噩梦

三、Promise

Promise可以将回调函数改为纵向发展，如

```js
var readFile = require('fs-readfile-promise');

readFile(fileA)
.then(function(data){
  console.log(data.toString());
})
.then(function(){
  return readFile(fileB);
})
.then(function(data){
  console.log(data.toString());
})
.catch(function(err) {
  console.log(err);
});
```

但这样最大的问题是代码冗余，有没有更好的写法呢？

四、协程

多个线程互相协作，完成异步任务

> 第一步，协程A开始执行。
>
> 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
>
> 第三步，（一段时间后）协程B交还执行权。
>
> 第四步，协程A恢复执行。

五、Generator函数

是协程在ES6的实现，函数可以暂停执行

```js
function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```

next 方法的作用是分阶段执行 Generator 函数。每次调用 next 方法，会返回一个对象，表示当前阶段的信息（ value 属性和 done 属性）。value 属性是 yield 语句后面表达式的值，表示当前阶段的值；done 属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。



next 方法返回值的 value 属性，是 Generator 函数向外输出数据；next 方法还可以接受参数，这是向 Generator 函数体内输入数据。

> ```javascript
> function* gen(x){
>   var y = yield x + 2;
>   return y;
> }
> 
> var g = gen(1);
> g.next() // { value: 3, done: false }
> g.next(2) // { value: 2, done: true }
> ```

上面代码中，第一个 next 方法的 value 属性，返回表达式 x + 2 的值（3）。第二个 next 方法带有参数2，这个参数可以传入 Generator 函数，作为上个阶段异步任务的返回结果，被函数体内的变量 y 接收。因此，这一步的 value 属性，返回的就是2（变量 y 的值）。

## DAY2

### 1. XX和XX的区别

#### 1.1 setTimeout和setInterval

- 都会进入Event Table并注册函数
- 都是在指定时间后将注册的函数置入Event Queue
- 待主线程内任务全部执行完毕，在Event Queue读取对应的函数，进入主线程执行

**setInterval的缺点：**

1. 当队列中没有该定时器的任何其他代码示例的时候，才会将定时器代码添加到队列中，也就是说，某些间隔可能会被跳过
   - 而setTimeout在把任务push到任务队列前不会判断上次的任务是否仍在队列中，所以我们可以用setTimeout模拟setInterval，规避掉这个缺点
2. 可能多个定时器会连续执行



#### 1.2 宏任务和微任务

- 宏任务和微任务对应**不同的**Event Queue

- macro-task(宏任务)：包括整体代码script，setTimeout，setInterval

- micro-task(微任务)：Promise，process.nextTick，catch，finally

- 宏任务执行完，会执行其后面的微任务

- ![image-20210703093933415](E:\frontendStudy\面试准备\fighting for wealth-第一周.assets\image-20210703093933415.png)

- 小试牛刀

  ```js
  console.log('1');
  
  setTimeout(function() {
      console.log('2');
      process.nextTick(function() {
          console.log('3');
      })
      new Promise(function(resolve) {
          console.log('4');
          resolve();
      }).then(function() {
          console.log('5')
      })
  })
  process.nextTick(function() {
      console.log('6');
  })
  new Promise(function(resolve) {
      console.log('7');
      resolve();
  }).then(function() {
      console.log('8')
  })
  
  setTimeout(function() {
      console.log('9');
      process.nextTick(function() {
          console.log('10');
      })
      new Promise(function(resolve) {
          console.log('11');
          resolve();
      }).then(function() {
          console.log('12')
      })
  })
  
  ```

  输出结果：1 7 6 8 2 4 3 5 9 11 10 12

#### 1.3 TCP和UDP的区别

a. TCP 是面向连接的可靠性传输，udp 是无连接的即发送数据前不需要先建立链接。

b. TCP 提供可靠的服务。也就是说，通过 TCP 连接传送的数据，无差错，不丢失，不重复，且按序到达; UDP 尽最大努力交付，即不保证可靠交付。并且因为 tcp 可靠， 面向连接，不会丢失数据因此适合大数据量的交换。

c. TCP 是面向字节流，UDP 面向报文，并且网络出现拥塞不会使得发送速率降低（因 此会出现丢包，对实时的应用比如 IP 电话和视频会议等）。

d. TCP 只能是 1 对 1 的，而UDP 支持 1 对 1,1 对多。

e. TCP 的首部较大为 20 字节，而 UDP 只有 8 字节。

#### 1.4 WebSocket和HTTP有什么区别

**相同点**
a. 都是一样基于TCP的，都是可靠性传输协议。

b. 都是应用层协议。

**不同点**
a. WebSocket是双向通信协议，模拟Socket协议，可以双向发送或接受信息。HTTP是单向的。

b. WebSocket是需要握手进行建立连接的(相对HTTP来说，WebSocket是一种持久化的协议。它会基于HTTP协议，来完成一部分握手，HTTP握手部分完成，协议升级为WebSocket)。

#### 1.5 http和https的区别

a. HTTP 明文传输，数据都是未加密的，安全性较差，HTTPS（SSL+HTTP） 数据传输过程是加密的，安全性较好。

b. 使用 HTTPS 协议需要到 CA（Certificate Authority，数字证书认证机构） 申请证书，一般免费证书较少，因而**需要一定费用**。

c. HTTP 页面响应速度比 HTTPS 快，主要是因为 HTTP 使用 TCP 三次握手建立连接，客户端和服务器需要交换 3 个包，而 HTTPS除了 TCP 的三个包，还要加上 ssl 握手需要的 9 个包，所以一共是 12 个包。

d. http 和 https 使用的是完全不同的连接方式，用的端口也不一样，前者是 80，后者是 443。

e. HTTPS 其实就是建构在 SSL/TLS 之上的 HTTP 协议，所以，要比较 HTTPS 比 HTTP 要更耗费服务器资源。

#### 1.6 bind、call和apply的区别

1. 都可以改变函数的this对象指向
2. 第一个参数都是this要指向的对象，如果如果没有这个参数或参数为undefined或null，则默认指向全局window。
3. 三者都可传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入。
4.  bind 改变this指向后不会立即执行，而是返回一个永久改变this指向的函数便于稍后调用；apply, call则是立即调用

#### 1.7 301和302有什么区别

- 301是永久重定向，客户端会自动把请求的地址修改为从服务器反馈回来的地址
- 302是临时重定向，一般用来做临时跳转，比如未登陆的用户访问用户中心被重定向到登录页面

### 2. z-index 层叠上下文

- z-index和定位会创建新的层叠上下文
- 七个层叠等级：

1. **背景和边框** ：形成层叠上下文的元素的背景和边框，它是整个上下文中层叠等级最低的。
2. **Z-Index 为负数** ：设置了 `z-index` 为负数的子元素以及由它所产生的层叠上下文
3. **块级盒模型**：位于正常文档流中的、块级的、非定位的子元素
4. **浮动盒模型** ：浮动的、非定位的子元素
5. **内联盒模型** ：位于正常文档流中的、内联的、非定位的子元素
6. **Z-index 为 0**：设置了 `z-index` 为 0 的、定位的子元素以及由它所产生的层叠上下文
7. **Z-Index 为正数** ：设置了 `z-index` 为正数的、定位的子元素以及由它所产生的层叠上下文，它是整个上下文中层叠等级最高的

![image-20210703104012231](E:\frontendStudy\面试准备\fighting for wealth-第一周.assets\image-20210703104012231.png)

## DAY4

### 1. 伪类和伪元素的区别

- CSS3中，伪类使用: 伪元素使用::
- `CSS` 伪类用于向某些选择器添加特殊的效果。
  - 存在DOM文档中
  - 类似于添加实际的类，可以是多个
  - ![在这里插入图片描述](E:\frontendStudy\面试准备\fighting for wealth-第一周.assets\20190527175840224.png)
- `CSS` 伪元素用于将特殊的效果添加到某些选择器。
  - 不存在DOM文档中，逻辑上存在，并创建新元素
  - 类似于添加实际的元素，一个选择器中只出现一次
  - ![在这里插入图片描述](E:\frontendStudy\面试准备\fighting for wealth-第一周.assets\2019052717580919.png)
- 本质区别是 “是否抽象创建了新元素”

## DAY5

### TCP连接

#### 为什么需要三次握手，两次不行吗？

弄清这个问题，我们需要先弄明白三次握手的目的是什么，能不能只用两次握手来达到同样的目的。

第一次握手：客户端发送网络包，服务端收到了。

这样服务端就能得出结论：客户端的发送能力、服务端的接收能力是正常的。

第二次握手：服务端发包，客户端收到了。

这样客户端就能得出结论：服务端的接收、发送能力，客户端的接收、发送能力是正常的。不过此时服务器并不能确认客户端的接收能力是否正常。

第三次握手：客户端发包，服务端收到了。

这样服务端就能得出结论：客户端的接收、发送能力正常，服务器自己的发送、接收能力也正常。

因此，需要三次握手才能确认双方的接收与发送能力是否正常。

试想如果是用两次握手，则会出现下面这种情况：

> 如客户端发出连接请求，但因连接请求报文丢失而未收到确认，于是客户端再重传一次连接请求。后来收到了确认，建立了连接。数据传输完毕后，就释放了连接，客户端共发出了两个连接请求报文段，其中第一个丢失，第二个到达了服务端，但是第一个丢失的报文段只是在某些网络结点长时间滞留了，延误到连接释放以后的某个时间才到达服务端，此时服务端误认为客户端又发出一次新的连接请求，于是就向客户端发出确认报文段，同意建立连接，不采用三次握手，只要服务端发出确认，就建立新的连接了，此时客户端忽略服务端发来的确认，也不发送数据，则服务端一致等待客户端发送数据，浪费资源。

#### 三次握手过程中可以携带数据吗？

其实第三次握手的时候，是可以携带数据的。但是，第一次、第二次握手不可以携带数据

为什么这样呢?大家可以想一个问题，假如第一次握手可以携带数据的话，如果有人要恶意攻击服务器，那他每次都在第一次握手中的 SYN 报文中放入大量的数据。因为攻击者根本就不理服务器的接收、发送能力是否正常，然后疯狂着重复发 SYN 报文的话，这会让服务器花费很多时间、内存空间来接收这些报文。

也就是说，第一次握手不可以放数据，其中一个简单的原因就是会让服务器更加容易受到攻击了。而对于第三次的话，此时客户端已经处于 ESTABLISHED 状态。对于客户端来说，他已经建立起连接了，并且也已经知道服务器的接收、发送能力是正常的了，所以能携带数据也没啥毛病。

####  SYN攻击是什么？

服务器端的资源分配是在二次握手时分配的，而客户端的资源是在完成三次握手时分配的，所以服务器容易受到SYN洪泛攻击。SYN攻击就是Client在短时间内伪造大量不存在的IP地址，并向Server不断地发送SYN包，Server则回复确认包，并等待Client确认，由于源地址不存在，因此Server需要不断重发直至超时，这些伪造的SYN包将长时间占用未连接队列，导致正常的SYN请求因为队列满而被丢弃，从而引起网络拥塞甚至系统瘫痪。SYN 攻击是一种典型的 DoS/DDoS 攻击。

检测 SYN 攻击非常的方便，当你在服务器上看到大量的半连接状态时，特别是源IP地址是随机的，基本上可以断定这是一次SYN攻击。在 Linux/Unix 上可以使用系统自带的 netstats 命令来检测 SYN 攻击。

```java
netstat -n -p TCP | grep SYN_RECV
```

常见的防御 SYN 攻击的方法有如下几种：

- 缩短超时（SYN Timeout）时间
- 增加最大半连接数
- 过滤网关防护
- SYN cookies技术