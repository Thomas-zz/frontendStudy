

# Promise

>  回调函数可以实现异步操作，promise可以解决“回调地狱”

Promise 对象的构造器（constructor）语法如下：

```javascript
let promise = new Promise(function(resolve, reject) {
  // executor（生产者代码，“歌手”）
});
```

传递给new Promise的函数被称为executor，当new Promise被创建时，executor会自动运行

当 executor 获得了结果，无论是早还是晚都没关系，它应该调用以下回调之一：

- `resolve(value)` — 如果任务成功完成并带有结果 `value`。
- `reject(error)` — 如果出现了 error，`error` 即为 error 对象。



## Promise对象的内部属性

- state
  - pending   最初状态
  - fulfilled    `resolve`被调用时
  - rejected    `reject`被调用时
- result
  - undefined   最初状态
  - value   `resolve(value)` 被调用时
  - error   `reject(error)` 被调用时

![image-20210802155252266](E:\frontendStudy\JavaScript\Promise,async&await\Promise.assets\image-20210802155252266.png)

> executor 只能调用一个 `resolve` 或一个 `reject`。任何状态的更改都是最终的。
>
> 所有其他的再对 `resolve` 和 `reject` 的调用都会被忽略：
>
> 一个 resolved 或 rejected 的 promise 都会被称为 “settled”。



## then, catch, finally

### then

```javascript
promise.then(
  function(result) { /* handle a successful result */ },
  function(error) { /* handle an error */ }
);
```

`.then` 的第一个参数是一个函数，该函数将在 promise resolved 后运行并接收结果。

`.then` 的第二个参数也是一个函数，该函数将在 promise rejected 后运行并接收 error。

如果我们只对成功完成的情况感兴趣，那么我们可以只为 `.then` 提供一个函数参数：

### catch

如果我们只对 error 感兴趣，那么我们可以使用 `null` 作为第一个参数：`.then(null, errorHandlingFunction)`。或者我们也可以使用 `.catch(errorHandlingFunction)`，其实是一样的：

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) 与 promise.then(null, f) 一样
promise.catch(alert); // 1 秒后显示 "Error: Whoops!"
```

`.catch(f)` 调用是 `.then(null, f)` 的完全的模拟，它只是一个简写形式。

### finally

`finally`不论promise是否成功，都会将结果和error传递给下一个处理程序

`finally`处理程序(handler)没有参数

例如，在这儿结果被从 `finally` 传递给了 `then`：

```javascript
new Promise((resolve, reject) => {
  setTimeout(() => resolve("result"), 2000)
})
  .finally(() => alert("Promise ready"))
  .then(result => alert(result)); // <-- .then 对结果进行处理
```

在这儿，promise 中有一个 error，这个 error 被从 `finally` 传递给了 `catch`：

```javascript
new Promise((resolve, reject) => {
  throw new Error("error");
})
  .finally(() => alert("Promise ready"))
  .catch(err => alert(err));  // <-- .catch 对 error 对象进行处理
```

Promise链与异常处理



如果 `.then`（或 `catch/finally` 都可以）处理程序（handler）返回一个 promise，那么链的其余部分将会等待，直到它状态变为 settled。当它被 settled 后，其 result（或 error）将被进一步传递下去。

这是一个完整的流程图：

<img src="E:\frontendStudy\JavaScript\Promise,async&amp;await\Promise.assets\image-20210802160840435.png" alt="image-20210802160840435" style="zoom:80%;" />



### 异常处理

- `.catch` 不必是立即的。它可能在一个或多个 `.then` 之后出现。捕获所有 error 的最简单的方法是，将 `.catch` 附加到链的末尾。

#### 隐式try...catch

Promise 的执行者（executor）和 promise 的处理程序（handler）周围有一个“隐式的 `try..catch`”。如果发生异常，它（译注：指异常）就会被捕获，并被视为 rejection 进行处理。

例如，下面这段代码：

```javascript
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(alert); // Error: Whoops!
```

……与下面这段代码工作上完全相同：

```javascript
new Promise((resolve, reject) => {
  reject(new Error("Whoops!"));
}).catch(alert); // Error: Whoops!
```

在 executor 周围的“隐式 `try..catch`”**自动捕获了 error，并将其变为 rejected promise**。

对于所有的 error 都会发生这种情况，而不仅仅是由 `throw` 语句导致的这些 error。例如，一个编程错误：

```javascript
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
  blabla(); // 没有这个函数
}).catch(alert); // ReferenceError: blabla is not defined
```

也就是说，`.catch` 不仅会捕获显式的 rejection，还会捕获它上面的处理程序（handler）中意外出现的 error。

#### 未处理的rejection

当发生一个常规的错误（error）并且未被 `try..catch` 捕获时会发生什么？脚本死了，并在控制台（console）中留下了一个信息。对于在 promise 中未被处理的 rejection，也会发生类似的事儿。

JavaScript 引擎会跟踪此类 rejection，在这种情况下会生成一个全局的 error。如果你运行上面这个代码，你可以在控制台（console）中看到。

在浏览器中，我们可以使用 `unhandledrejection` 事件来捕获这类 error：

```javascript
window.addEventListener('unhandledrejection', function(event) {
  // 这个事件对象有两个特殊的属性：
  alert(event.promise); // [object Promise] - 生成该全局 error 的 promise
  alert(event.reason); // Error: Whoops! - 未处理的 error 对象
});

new Promise(function() {
  throw new Error("Whoops!");
}); // 没有用来处理 error 的 catch
```

#### 做做题

你怎么看？`.catch` 会被触发么？解释你的答案。

```javascript
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

答案是：**不，它不会被触发**：

```javascript
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

正如本章所讲，函数代码周围有个“隐式的 `try..catch`”。所以，所有同步错误都会得到处理。

但是这里的错误并不是在 executor 运行时生成的，而是在稍后生成的。因此，promise 无法处理它。

## Promise API

在 `Promise` 类中，有 5 种静态方法。

### Promise.all

- 接受一个 promise 数组作为参数（从技术上讲，它可以是任何可迭代的，但通常是一个数组）并返回一个新的 promise。
- 当所有给定的 promise 都被 settled 时，新的 promise 才会 resolve，并且其结果数组将成为新的 promise 的结果。结果数组中元素的顺序与其在源 promise 中的顺序相同.
- 一个常见的技巧是，将一个任务数据数组映射（map）到一个 promise 数组，然后将其包装到 `Promise.all`。

例如，如果我们有一个存储 URL 的数组，我们可以像这样 fetch 它们：

```javascript
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// 将每个 url 映射（map）到 fetch 的 promise 中
let requests = urls.map(url => fetch(url));

// Promise.all 等待所有任务都 resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

**如果任意一个 promise 被 reject，由 `Promise.all` 返回的 promise 就会立即 reject，并且带有的就是这个 error。如果出现 error，其他 promise 将被忽略**

> **`Promise.all(iterable)` 允许在 `iterable` 中使用 non-promise 的“常规”值**
>
> 通常，`Promise.all(...)` 接受含有 promise 项的可迭代对象（大多数情况下是数组）作为参数。但是，如果这些对象中的任何一个不是 promise，那么它将被“按原样”传递给结果数组。
>
> 例如，这里的结果是 `[1, 2, 3]`：
>
> ```javascript
> Promise.all([
>   new Promise((resolve, reject) => {
>     setTimeout(() => resolve(1), 1000)
>   }),
>   2,
>   3
> ]).then(alert); // 1, 2, 3
> ```
>
> 所以我们可以在方便的地方将准备好的值传递给 `Promise.all`

### Promise.allSettled

`Promise.allSettled` 等待所有的 promise 都被 settle，无论结果如何。结果数组具有：

- `{status:"fulfilled", value:result}` 对于成功的响应，
- `{status:"rejected", reason:error}` 对于 error。

```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

### Promise.race

与 `Promise.all` 类似，但只等待第一个 settled 的 promise 并获取其结果（或 error）。

### Promise.resolve/reject

在现代的代码中，很少需要使用 `Promise.resolve` 和 `Promise.reject` 方法，因为 `async/await` 语法使它们变得有些过时了。

- `Promise.resolve(value)` 用结果 `value` 创建一个 resolved 的 promise。
- `Promise.reject(error)` 用 `error` 创建一个 rejected 的 promise。

用于当前操作结果封装进promise，以满足期望返回一个promise的需求

