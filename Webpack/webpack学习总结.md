## 有哪些模块引入规范？

### 模块引入规范

- ES Moudle
  - 导入：import xx from './...'
  - 导出：export default XXX
  - 底层是静态引入
- Common Js
  - 导入：var XXX = require('./...')
  - 导出：module.exports = XXX
  - 底层是动态引入
- CMD
- ADM



## loader

>  loader就是一个打包方案，对文件进行预处理，告诉webpack该如何打包

- loader的执行顺序是从下到上，从右到左



## plugins

> 插件，可以在webpack运行到某个时刻的时候，帮我们做某些事



## devtool(source-map)

调试工具，能帮助我们定位到错误位置



## WebpackDevServer

热更新，会将dist目录放在内存中，加快打包速度。会帮我们起一个服务器，实时自动编译代码



## Hot Module Replacement(HMR)

`热模块替换`

不需要刷新页面，就可以直接替换，增删模块

当我们针对源代码的样式进行修改时，devServer会帮助我们刷新浏览器，但是此时我们对HTML进行的更新都没有了（例如给页面append一个元素），必须重新进行一遍操作。

这里就可以通过HMR，修改CSS后直接更新了页面的style就行了，不改变页面html结构

> 会在应用程序运行过程中，替换、添加或删除 [模块](https://webpack.docschina.org/concepts/modules/)，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：
>
> - 保留在完全重新加载页面期间丢失的应用程序状态。
> - 只更新变更内容，以节省宝贵的开发时间。
> - 在源代码中 CSS/JS 产生修改时，会立刻在浏览器中进行更新，这几乎相当于在浏览器 devtools 直接更改样式

## 高级概念

### Tree Shaking

摇树，能在我们打包时把一个模块里没有用到的部分摇晃掉，只支持ES Module形式引入的文件

#### Tree Shaking+Babel

这两个配合使用可能会发现我们打包好的bundle，没有正确的摇掉未使用的方法。原因是因为

1. 函数的参数若是引用类型，对于它属性的操作，都是有可能会产生副作用的。因为首先它是引用类型，对它属性的任何修改其实都是改变了函数外部的数据。其次获取或修改它的属性，会触发getter或者setter，而getter、setter是不透明的，有可能会产生副作用。
2. uglify没有完善的程序流分析。它可以简单的判断变量后续是否被引用、修改，但是不能判断一个变量完整的修改过程，不知道它是否已经指向了外部变量，所以很多有可能会产生副作用的代码，都只能保守的不删除。
3. rollup有程序流分析的功能，可以更好的判断代码是否真正会产生副作用。

解决方法：

1. 将每一个组件或者功能函数，都打包成单独的文件或目录。然后可以像如下的方式引入：

```
import clone from 'lodash/clone'

import Button from 'antd/lib/button';
```

但是这样呢也比较麻烦，而且不能同时引入多个组件。所以这些比较流行的组件库大哥如antd，element专门开发了babel插件，使得用户能以`import { Button, Message } form 'antd'`这样的方式去按需加载。本质上就是通过插件将上一句的代码又转化成如下：

```
import Button from 'antd/lib/button';
import Message from 'antd/lib/button';
```

这样似乎是最完美的变相tree-shaking方案。唯一不足的是，对于组件库开发者来说，需要专门开发一个babel插件；对于使用者来说，需要引入一个babel插件，稍微略增加了开发成本与使用成本。

2. 先使用babel打包后，再用Tree Shaking



### Code Splitting

代码分割可以让我们的页面执行更高效，比如如果打包后的大小为2M，其中有业务代码修改了，用户再向服务器请求的时候请求的是2M大小的文件。如果我们把业务代码分割出来，打包后变成两个1M的文件，修改了业务代码后，浏览器只需请求那修改的1M大小的文件，没有变化的另个文件不做请求。



### Chunk

Chunk是webpack打包过程中，一堆module的集合，是一些模块的封装单元。在chunk构建完成就呈现为bundle，但不一定是一个chunk对应一个bundle

产生Chunk的途径：entry入口、异步加载模块、代码分割



### prefetch和preload

在声明 import 时，使用下面这些内置指令，可以让 webpack 输出 "resource hint(资源提示)"，来告知浏览器：

- **prefetch**(预获取)：将来某些导航下可能需要的资源，会在浏览器网络空闲的时间加载
- **preload**(预加载)：当前导航下可能需要资源

父 chunk 完成加载，webpack 就会添加 prefetch hint(预取提示)。

与 prefetch 指令相比，preload 指令有许多不同之处：

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
- 浏览器支持程度不同。

**我的理解**

在需要的时候才异步加载js能够提高我们页面的代码利用率，加快首页展示速度，但是每个需求只有在我们需要的时候才去请求js文件，会影响我们的交互体验。而prefetch能够解决这个问题，它能在我们页面主要文件加载完成后，利用网络空闲的时间加载我们可能需要的js文件（预获取），这样当我们使用到这部分功能时，能够快速的从缓存获取到这部分js文件。



### 浏览器缓存

[contenthash]是一个占位符，若我们文件有更改，contenthash的值会改变，这样在我们文件更新的时候，刷新浏览器就能拿到更新后的文件。否则即便文件已经更新，但文件名没变，浏览器会从缓存里读取文件



### shimming（垫片）

解决webpack打包过程中的兼容性问题，如lodash，jquery

webpack中，模块之间的变量是隔离的，假如我引入了多个模块，这多个模块都用到了某一个模块如lodash，那这些lodash是相互独立引入的，而这是不太好的，我们就可以通过shimming告诉webpack

```js
const webpack = require('webpack')
plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery'
    })
  ],
```

>  如果你遇到了至少一处用到 `_` 变量的模块实例，那请你将 `lodash` package 引入进来，并将其提供给需要用到它的模块。



### Library的打包

当我们写库函数的时候，如果想要我们的库能够被其他人引入使用，我们需要通过 [`output.library`](https://webpack.docschina.org/configuration/output/#outputlibrary) 配置项暴露从入口导出的内容。因为每个人导入的规范可能不同，需要配置我们的库能被各种方式成功导入

设置其type配置项

```diff
 const path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     ...
-    library: 'webpackNumbers',
+    library: {
+      name: 'webpackNumbers',
+      type: 'umd',
+    },
   },
 };
```

现在 webpack 将打包一个库，其可以与 CommonJS、AMD 以及 script 标签使用。



### 外部化lodash

当我们写的库需要使用别的依赖如lodash，我们将lodash打包到自己的库中，但我们的项目中可能已经引入了lodash，这样就重复导入了。

这可以使用 `externals` 配置来完成，这意味着你的library需要一个名为`lodash`的依赖，而这个依赖你的library里并没有，需要自行安装并引入，这个依赖在 consumer 环境中必须存在且可用。