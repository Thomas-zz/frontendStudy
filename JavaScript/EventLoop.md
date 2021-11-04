# 理解EventLoop

## 宏任务和微任务

### 宏任务

普通任务队列和延迟队列中的任务，包括主线程，setTimeout(), setInterval()

- 当前事件循环开始迭代后加入到队列中的任务，需要在**下一次EventLoop**时才会被执行

- ### 宏任务

  | #                       | 浏览器 | Node |
  | ----------------------- | ------ | ---- |
  | `I/O`                   | ✅      | ✅    |
  | `setTimeout`            | ✅      | ✅    |
  | `setInterval`           | ✅      | ✅    |
  | `setImmediate`          | ❌      | ✅    |
  | `requestAnimationFrame` | ✅      | ❌    |

### 微任务

- 引入微任务的初衷是为了解决异步回调的问题，对于异步回调的处理，有多少种方式？总结起来有两点:

  1. 将异步回调进行宏任务队列的入队操作。
  2. 将异步回调放到当前宏任务的末尾。

  如果采用第一种方式，那么执行回调的时机应该是在前面`所有的宏任务`完成之后，倘若现在的任务队列非常长，那么回调迟迟得不到执行，造成`应用卡顿`。

  第二种方式就是`微任务`的解决方式，每个宏任务中有一个**微任务队列**当该宏任务执行完成，会检查其中的微任务队列，并执行当中的微任务

- 常见的微任务有

- ### 微任务

  | #                            | 浏览器 | Node |
  | ---------------------------- | ------ | ---- |
  | `process.nextTick`           | ❌      | ✅    |
  | `MutationObserver`           | ✅      | ❌    |
  | `Promise.then catch finally` | ✅      | ✅    |

> **async/await**
>
> 因为，`async/await`本质上还是基于`Promise`的一些封装，而`Promise`是属于微任务的一种。所以在使用`await`关键字与`Promise.then`效果类似：
>
> ```
> setTimeout(_ => console.log(4))
> 
> async function main() {
>   console.log(1)
>   await Promise.resolve()
>   console.log(3)
> }
> 
> main()
> 
> console.log(2)
> 复制代码
> ```
>
> **async函数在await之前的代码都是同步执行的，可以理解为await之前的代码属于`new Promise`时传入的代码，await之后的所有代码都是在`Promise.then`中的回调**
>
> 作者：Jiasm
> 链接：https://juejin.cn/post/6844903657264136200

### 练习

```js
Promise.resolve().then(()=>{
  console.log('Promise1')  
  setTimeout(()=>{
    console.log('setTimeout2')
  },0)
});
setTimeout(()=>{
  console.log('setTimeout1')
  Promise.resolve().then(()=>{
    console.log('Promise2')    
  })
},0);
console.log('start');

// start
// Promise1
// setTimeout1
// Promise2
// setTimeout2
```

### process.nextTick

process.nextTick 是一个独立于 eventLoop 的任务队列。

在每一个 eventLoop 阶段完成后会去检查这个队列，如果里面有任务，会让这部分任务`优先于微任务`执行。