

# webpack速览笔记
本文没有很深入的讲解webpack的使用和原理，但详尽覆盖了webpack的基本到进阶到优化的使用，更像是个webpack学习目录，工具笔记。建议根据右侧目录选择对应部分了解并深入学习。

## 模块引入规范

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

## 安装方式

### 事前准备

1. 安装node.js
2. 安装npm
3. 在目录文件初始化，npm init

<img src="E:\frontendStudy\Webpack\WebPack.assets\image-20210711104735820.png" alt="image-20210711104735820" style="zoom:67%;" />

### 全局安装

```
npm install webpack webpack-cli -g
```

检查版本：webpack -v

**不推荐**，版本号是固定的，兼容差

全局卸载

```
npm uninstall webpack webpack-cli -g
```



### 在项目中安装

*<u>不同项目可以用不同版本</u>*

进入项目中，执行

```
npm install webpack webpack-cli -D
```

检查版本：npx webpack -v

**安装指定版本的webpack**

检查webpack版本：```npm info webpack```

安装指定版本：```npm install webpack@版本号 webpack-cli -D```

## webpack配置文件

### webpack.config.js

根目录下新建配置文件

```JS
const path = require('path');  //路径解析

module.exports = {
  mode: 'production',   //打包模式，默认为production，压缩代码。development 不压缩代码
  etry: './index.js',  //入口文件
  /*是对下面这句的简写
    main: './index.js'
  */
  output: {             //出口文件
    filename: 'bundle.js',   //文件名  打包后的index.html里，直接引用的文件打包后的名字
    chunkFilename: [name].chunk.js   //打包后的index.html里，间接引用的文件打包后的名字
    path: path.resolve(__dirname, 'dist')  //绝对路径__dirname，dist目录下
  }
}
```

### 打包命令

- global 全局下

  - ```webpack index.js```

- local 项目目录下

  - ```npx webpack index.js```

  - 配置好webpack.config.js中默认入口文件后

  - ```npx webpack```

  - 配置package.json文件中的script

  - ```json
    {
        ...
        "script": {
            "bundle": "webpack"
        },
        ...
    }
    ```

  - 此后，可以直接运行 ```npm run bundle```

## webpack核心概念

### loader

>  loader就是一个打包方案，对源代码进行转换，告诉webpack该如何打包
>
>  官网： https://webpack.docschina.org/loaders/

- loader的执行顺序是**从下到上，从右到左**

- 常用的loader：

  - babel-loader   帮我们将JS代码向低版本转换

    - 安装Babel  `npm install --save-dev babel-loader @babel/core`

    - 配置rules

      ```js
      rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,     //node_module里的代码不用考虑
              use: {
                loader: "babel-loader",
              }
            }
          ]
      ```

      到此已经可以将ES6语法转为ES5语法了，但ES6中有，ES5没有的方法不会被改写

    - 继续配置babel.config.json文件  `npm install @babel/preset-env --save-dev`

      ```js
      rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,     //node_module里的代码不用考虑
              use: {
                loader: "babel-loader",
                options: {   //添加这一句
                  presets: ['@babel/preset-env']
                }
              }
            }
          ]
      ```

      在js文件中引入`import "@babel/polyfill";`

      到此webpack功能已能可以生效，但`env preset`中有太多包帮助我们转换ES6语法，会使打包出来的文件大小大大增大

    - 配置其参数按需打包，减小打包后的体积

      ```js
      presets: [['@babel/preset-env',{
          useBuiltIns: 'usage'
       //tips:可以设置目标浏览器，targets会识别大于这个版本的浏览器支不支持ES6，支持就不转换   
          targets: {
          chrome: "67",
      }
      }]]
      ```

    **注意：polyfill会修改全局变量及其原型，可能带来意想不到的问题，尤其在开发第三方库的时候**

    这时候最好使用` @babel/plugin-transform-runtime`，它使用闭包，能避免上述问题

  - style-loader、css-loader

    - css-loader：分析几个css文件中的关系，并打包成一个css文件（负责处理 `@import` 等语句）

    - style-loader：将打包得到的css文件挂载到页面的header部分（动态创建 `style` 标签，将 `css` 插入到 `head` 中.）

  - sass-loader：顾名思义，处理sass文件

  - postcss-loader:  在css一些属性前增加厂商前缀，以兼容不同浏览器

  - webpack4.0：raw-loader、file-loader、url-loader

    - 在webpack5中，资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：
      - `asset/resource` 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。
      - `asset/inline` 导出一个资源的 data URI。之前通过使用 `url-loader` 实现。
      - `asset/source` 导出资源的源代码。之前通过使用 `raw-loader` 实现。
      - `asset` 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。
    - https://webpack.docschina.org/guides/asset-modules/#root



### plugins

> 插件，可以在webpack运行到某个时刻的时候，帮我们做某些事
>
> 官网：https://webpack.docschina.org/plugins/

常用plugin

- HtmlWebpackPlugin：生成一个 HTML5 文件， 在 body 中使用 `script` 标签引入你所有 webpack 生成的 bundle。
- clean-webpack-plugin：在打包前帮我们删除原有的打包文件
- CopyWebpackPlugin:  复制已有的JS、CSS文件（本地文件），作为构建过程的一部分，这部分不需要`webpack`编译

### devtool(source-map)

> 调试工具，能帮助我们定位到错误位置，不同的配置会明显影响到构建和重新构建的速度

```js
module.exports = {
    devtool: 'eval-cheap-module-source-map' //开发环境下使用
}
```

简单来说

- eval速度最快，但不一定准确
- cheap只告诉我们错误在哪一行，不会指出在哪一列
- module不止管我们也业务代码，也会管第三方模块
- inline不单独生成一个.map文件，在打包好的js中以base64位映射

配置建议：

- development devtool：eval-cheap-module-source-map
- production devtool：cheap-module-source-map,或不配

> ###### Tip
>
> 你可以直接使用 `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin` 来替代使用 `devtool` 选项，因为它有更多的选项。切勿同时使用 `devtool` 选项和 `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin` 插件。`devtool` 选项在内部添加过这些插件，所以你最终将应用两次插件。



### WebpackDevServer

热更新，会将dist目录放在内存中，加快打包速度。会帮我们起一个服务器，实时自动编译代码

```js
//配置webpack.config.js文件
...
devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,   //配置是否启用 gzip 压缩
        open:true,   //自动打开
        port: 8080,
    },
...
```



### Hot Module Replacement(HMR)

`热模块替换`

不需要刷新页面，就可以直接替换，增删模块

当我们针对源代码的样式进行修改时，devServer会帮助我们刷新浏览器，但是此时我们对HTML进行的更新都没有了（例如给页面append一个元素），必须重新进行一遍操作。

这里就可以通过HMR，修改CSS后直接更新了页面的style就行了，不改变页面html结构

> 会在应用程序运行过程中，替换、添加或删除 [模块](https://webpack.docschina.org/concepts/modules/)，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：
>
> - 保留在完全重新加载页面期间丢失的应用程序状态。
> - 只更新变更内容，以节省宝贵的开发时间。
> - 在源代码中 CSS/JS 产生修改时，会立刻在浏览器中进行更新，这几乎相当于在浏览器 devtools 直接更改样式

webpack.config.js

1. 首先配置 `devServer` 的 `hot` 为 `true`
2. 并且在 `plugins` 中增加 `new webpack.HotModuleReplacementPlugin()`

```js
//首先要引入webpack
const webpack = require('webpack');

//开启HMR
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,   //配置是否启用 gzip 压缩
        open:true,   //自动打开
        port: 8080,
        hot: true,  //开启HMR
        hotOnly: true
    },
        
    //添加插件
    plugins: [new webpack.HotModuleReplacementPlugin()],

```

这样就可以监听css更改但不改变页面html结构

如果要使用js的HMR，使修改js文件页面不会整个都刷新，还需要在添加一些配置，如在index.js下添加`module.hot.accept()`

```js
if (module.hot) {
    module.hot.accept('./number', () => {
        document.body.removeChild(document.getElementById('number'));
        number();
    })
}
```



### entry和output配置

```js
module.exports = {
//可以设置多个入口，这是应用程序中定义入口的最可扩展的方式。
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
      //当我们需要吧文件放到cdn时，我们可以这样在页面引入js文件
    publicPath: 'http://cdn.com.cn' 
      //使用占位符配置出口路径，确保每个文件有唯一名字,hash用于CDN缓存
    filename: '[name].[hash]js',
    path: __dirname + '/dist',
  },
};
```



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

```js
import clone from 'lodash/clone'

import Button from 'antd/lib/button';
```

但是这样呢也比较麻烦，而且不能同时引入多个组件。所以这些比较流行的组件库大哥如antd，element专门开发了babel插件，使得用户能以`import { Button, Message } form 'antd'`这样的方式去按需加载。本质上就是通过插件将上一句的代码又转化成如下：

```js
import Button from 'antd/lib/button';
import Message from 'antd/lib/button';
```

这样似乎是最完美的变相tree-shaking方案。唯一不足的是，对于组件库开发者来说，需要专门开发一个babel插件；对于使用者来说，需要引入一个babel插件，稍微略增加了开发成本与使用成本。

2. 先使用babel打包后，再用Tree Shaking

### 开发模式和生产模式的区分打包

1. 创建两个配置文件，一个为`webpack.dev.js`，一个为`webpack.prod.js`，分别是开发环境下和生产环境下的配置文件

2. 在package.json文件中设置打包语句

   1. `"build": "webpack --config webpack.prod.js"`
   2. `"dev": "webpack serve --open --config webpack.dev.js"`

3. 但这样我们两个配置文件中会有大量重复的配置，且这部分配置一个修改另一个也要手动修改，所以我们可以把它们的公共部分提取出来，命名为`webpack.common.js`

4. 合并`webpack.common.js`需要用到一个插件叫`webpack-merge`，命令行下载`npm install webpack-merge -D`

5. 在`webpack.dev.js`和`webpack.prod.js`中导入`webpack.common.js`并合并，如

   ```js
   const { merge } = require('webpack-merge');
   const commonConfig = require('./webpack.common');
   
   const prodConfig = {
       mode: 'production',   //生产模式
       devtool: 'cheap-module-source-map',
   }
   
   module.exports = merge(commonConfig, prodConfig);
   
   ```

6. 可以在根目录下创建build文件夹，把这三个配置放进去，同时要修改package.json当中的命令行配置

### Code Splitting

代码分割可以让我们的页面执行更高效，比如如果打包后的大小为2M，其中有业务代码修改了，用户再向服务器请求的时候请求的是2M大小的文件。如果我们把业务代码分割出来，打包后变成两个1M的文件，修改了业务代码后，浏览器只需请求那修改的1M大小的文件，没有变化的另个文件不做请求。

webpack中实现代码分割的两种方式：

1. 同步代码：在配置中添加

   ```js
       optimization: {
           splitChunks:{
               chunks: 'all'
           }
       },
   ```

1. 异步代码（import）：无需任何配置，会自动进行代码分割

   ```js
   function getComponent() {
       //通过添加这段注释修改打包后的文件名
       return import(/* webpackChunkName: "lodash" */'lodash').then(({default: _}) => {
           var element = document.createElement('div');
           element.innerHTML = _.join(['thomas', 'zz'], '-');
           return element;
       })
   }
   
   getComponent().then(element => {
       document.body.appendChild(element);
   })
   ```

   `webpack` 遇到 `import(****)` 这样的语法的时候，会这样处理：

   - 以**** 为入口新生成一个 `Chunk`
   - 当代码执行到 `import` 所在的语句时，才会加载该 `Chunk` 所对应的文件

#### splitChunks配置

官网的默认配置

缓存组可以继承和/或覆盖来自 `splitChunks.*` 的任何选项。但是 `test`、`priority` 和 `reuseExistingChunk` 只能在缓存组级别上进行配置。将它们设置为 `false`以禁用任何默认缓存组。

```js
splitChunks: {
            chunks: 'async',   //异步加载的模块才会被切割
            minSize: 20000,    //大于这个值的模块才会被切割
            minRemainingSize: 0,
            minChunks: 1,      //引入次数大于1才会被切割
            maxAsyncRequests: 30,     //按需加载时的最大并行请求数
            maxInitialRequests: 30,   //入口点的最大并行请求数
            enforceSizeThreshold: 50000,
            cacheGroups: {    //缓存组
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,  //那个文件夹下导入的模块会被分到一组
                    priority: -10,   //优先级
                    reuseExistingChunk: true,    //已经导入过的模块不会重复导入
                    name: '111.js'    //修改打包好文件的名称
                },
                default: {     //默认组
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
```

### CSS文件的代码分割

#### mini-css-extract-plugin

> 一般css文件会和js文件打包在一起，此插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。

使用 `mini-css-extract-plugin`，`CSS` 文件默认不会被压缩，如果想要压缩，需要配置 `optimization`

### Chunk

Chunk是webpack打包过程中，一堆module的集合，是一些模块的封装单元。在chunk构建完成就呈现为bundle，但不一定是一个chunk对应一个bundle

产生Chunk的途径：entry入口、异步加载模块、代码分割

### 打包分析

1. 首先添加一个命令，生成stats.json文件`--profile --json > stats.json` 

   `"bundle": "webpack --profile --json > stats.json --config ./build/webpack.dev.js",`

2. 生成后的文件我们可以用各种分析工具去分析，这里推荐官方的bundle analysis，比如[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

3. 它要安装插件，并且配置

   ```js
   # NPM
   npm install --save-dev webpack-bundle-analyzer
   # Yarn
   yarn add -D webpack-bundle-analyzer
   
   ```

   ```js
   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
   
   module.exports = {
     plugins: [
       new BundleAnalyzerPlugin()
     ]
   }
   
   ```

   配置完成后我们再打包就会自动帮我们打开一个分析页面。里面有详细的分析结果。

<img src="E:\frontendStudy\Webpack\WebPack.assets\image-20210722211109917.png" alt="image-20210722211109917" style="zoom:40%;" />



### prefetch(预获取)和preload(预加载)

在声明 import 时，使用下面这些内置指令，可以让 webpack 输出 "resource hint(资源提示)"，来告知浏览器：

- **prefetch**(预获取)：将来某些导航下可能需要的资源，会在浏览器网络空闲的时间加载
- **preload**(预加载)：当前导航下可能需要资源

下面这个 prefetch 的简单示例中，有一个 `HomePage` 组件，其内部渲染一个 `LoginButton` 组件，然后在点击后按需加载 `LoginModal` 组件。

```js
// LoginButton.js
// ...
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
```

这会生成 `<link rel="prefetch" href="login-modal-chunk.js">` 并追加到页面头部，指示着浏览器在闲置时间预取 `login-modal-chunk.js` 文件。

只要父 chunk 完成加载，webpack 就会添加 prefetch hint(预取提示)。

与 prefetch 指令相比，preload 指令有许多不同之处：

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
- 浏览器支持程度不同。

**我的理解**

在需要的时候才异步加载js能够提高我们页面的代码利用率，加快首页展示速度，但是每个需求只有在我们需要的时候才去请求js文件，会影响我们的交互体验。而prefetch能够解决这个问题，它能在我们页面主要文件加载完成后，利用网络空闲的时间加载我们可能需要的js文件（预获取），这样当我们使用到这部分功能时，能够快速的从缓存获取到这部分js文件。



### 浏览器缓存

[contenthash]是一个占位符，若我们文件有更改，contenthash的值会改变，这样在我们文件更新的时候，刷新浏览器就能拿到更新后的文件。否则即便文件已经更新，但文件名没变，浏览器会从缓存里读取文件

```js
output: [
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
]
```



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

如果你遇到了至少一处用到 `_` 变量的模块实例，那请你将 `lodash` package 引入进来，并将其提供给需要用到它的模块。

### 外部化lodash

当我们写的库需要使用别的依赖如lodash，我们将lodash打包到自己的库中，但我们的项目中可能已经引入了lodash，这样就重复导入了。

这可以使用 `externals` 配置来完成，这意味着你的library需要一个名为`lodash`的依赖，而这个依赖你的library里并没有，需要自行安装并引入，这个依赖在 consumer 环境中必须存在且可用。

## 实战配置

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

#### 外部化lodash

当我们写的库需要使用别的依赖如lodash，我们将lodash打包到自己的库中，但我们的项目中可能已经引入了lodash，这样就重复导入了。

这可以使用 `externals` 配置来完成：

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      ...
    },
+   externals: {
+     lodash: {
+       commonjs: 'lodash',
+       commonjs2: 'lodash',
+       amd: 'lodash',
+       root: '_',
+     },
+   },
  };
```

这意味着你的 library 需要一个名为 `lodash` 的依赖，这个依赖在 consumer 环境中必须存在且可用。

#### 最终步骤 

遵循 [生产环境](https://webpack.docschina.org/guides/production) 指南中提到的步骤，来优化生产环境下的输出结果。那么，我们还需要将生成 bundle 的文件路径，添加到 `package.json` 中的 `main` 字段中。

**package.json**

```json
{
  ...
  "main": "dist/webpack-numbers.js",
  ...
}
```

或者，按照这个 [指南](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage)，将其添加为标准模块：

```json
{
  ...
  "module": "src/index.js",
  ...
}
```

### PWA

https://webpack.docschina.org/guides/progressive-web-application/#root

>  渐进式网络应用程序(progressive web application - PWA）,通过使用名为 [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/) 的 web 技术来实现在**离线(offline)**时应用程序能够继续运行功能

> Service worker运行在worker上下文，因此它不能访问DOM。相对于驱动应用的主JavaScript线程，它运行在其他线程中，所以不会造成阻塞。它设计为完全异步，同步API（如[XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)和[localStorage (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)）不能在service worker中使用。
>
> 出于安全考量，Service workers只能由HTTPS承载，毕竟修改网络请求的能力暴露给中间人攻击会非常危险。在Firefox浏览器的[用户隐私模式](https://support.mozilla.org/zh-CN/kb/隐私浏览)，Service Worker不可用。

### 多页面打包

1. 修改entry路径，有多个入口文件

   ```js
   entry: {
   		index: './src/index.js',
   		list: './src/list.js',
   		detail: './src/detail.js',
   	},
   ```

2. 增加plugins

   `chunks` 的参数，可以接受一个数组，配置此参数仅会将数组中指定的js引入到html文件中，此外，如果你需要引入多个JS文件，仅有少数不想引入，还可以指定 `excludeChunks` 参数，它接受一个数组

   ```js
    plugins: [
   	new HtmlWebpackPlugin({
   		template: 'src/index.html',
   		filename: `${item}.html`,
   		chunks: ['index', 'runtime', 'vendors', item]
   	}),
        new HtmlWebpackPlugin({
   		template: 'src/list.html',
   		filename: `${item}.html`,
   		chunks: ['list', 'vendors', item]
   	})
    ]
   ```

3. 自动化配置.

   手动配置每个页面的引入文件在页面少的时候还可以，但在页面多起来的时候就很麻烦了，这个时候可以编写自动化配置

   ```js
   const makePlugins = (configs) => {
   	const plugins = [
   		new CleanWebpackPlugin(['dist'], {
   			root: path.resolve(__dirname, '../')
   		})
   	];
   	Object.keys(configs.entry).forEach(item => {
   		plugins.push(
   			new HtmlWebpackPlugin({
   				template: 'src/index.html',
   				filename: `${item}.html`,
   				chunks: ['runtime', 'vendors', item]
   			})
   		)
   	});
   	const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
   	files.forEach(file => {
   		if(/.*\.dll.js/.test(file)) {
   			plugins.push(new AddAssetHtmlWebpackPlugin({
   				filepath: path.resolve(__dirname, '../dll', file)
   			}))
   		}
   		if(/.*\.manifest.json/.test(file)) {
   			plugins.push(new webpack.DllReferencePlugin({
   				manifest: path.resolve(__dirname, '../dll', file)
   			}))
   		}
   	});
   	return plugins;
   }
   
   configs.plugins = makePlugins(configs);
   ```



### 环境变量的使用

很多时候，我们在开发环境中会使用预发环境或者是本地的域名，生产环境中使用线上域名，我们可以在 `webpack` 定义环境变量，然后在代码中使用。

举例

```js
package.json

"scripts": {
　　"dev-build": "webpack --profile --json > stats.json --config ./build/webpack.common.js",
　　"dev": "webpack-dev-server --config ./build/webpack.common.js",
　　"build": "webpack --env.production --config ./build/webpack.common.js"
},
```

```js
webpack.common.js

const commonConfig = {
}

module.exports = (env) => {
　　// 如果有这个全局变量，且是线上环境，否则是开发环境
　　if(env && env.production) {
　　　　return merge(commonConfig, prodConfig);
　　} else {
　　　　return merge(commonConfig, devConfig);
　　}
}
```

环境变量能赋值，默认值为true

**或者**

使用 `webpack` 内置插件 `DefinePlugin` 来定义环境变量。

`DefinePlugin` 中的每个键，是一个标识符.

- 如果 `value` 是一个字符串，会被当做 `code` 片段
- 如果 `value` 不是一个字符串，会被`stringify`
- 如果 `value` 是一个对象，正常对象定义即可
- 如果 `key` 中有 `typeof`，它只针对 `typeof` 调用定义

```js
//webpack.config.dev.js
const webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev'), //字符串
            FLAG: 'true' //FLAG 是个布尔类型
        })
    ]
}
```

```js
//index.js
if(DEV === 'dev') {
    //开发环境
}else {
    //生产环境
}
```

### proxy代理实现请求转发

当我们在**开发环境**中调试的时候，代理某些URL可能会很有用，我们就不需要逐条去修改请求里的地址

假设服务端在 `localhost:3000` 上，可以使用它来启用代理：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};
```

现在，对 `/api/users` 的请求会将请求代理到 `http://localhost:3000/api/users`。

如果不希望传递`/api`，则需要重写路径：

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
```

默认情况下，将不接受在 HTTPS 上运行且证书无效的后端服务器

**webpack.config.js**

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'https://other-server.example.com',
        secure: false,
      },
    },
  },
};
```

### 前端模拟数据

> 作者：刘小夕
> 链接：https://juejin.cn/post/6844904084927938567

```
module.exports = {
    devServer: {
        before(app) {
            app.get('/user', (req, res) => {
                res.json({name: '刘小夕'})
            })
        }
    }
}
复制代码
```

在 `src/index.js` 中直接请求 `/user` 接口。

```
fetch("user")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
复制代码
```

> 使用 mocker-api mock数据接口

mocker-api 为 REST API 创建模拟 API。在没有实际 REST API 服务器的情况下测试应用程序时，它会很有用。

1. 安装 [mocker-api](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fmocker-api):

```
npm install mocker-api -D
复制代码
```

1. 在项目中新建mock文件夹，新建 mocker.js.文件，文件如下:

```
module.exports = {
    'GET /user': {name: '刘小夕'},
    'POST /login/account': (req, res) => {
        const { password, username } = req.body
        if (password === '888888' && username === 'admin') {
            return res.send({
                status: 'ok',
                code: 0,
                token: 'sdfsdfsdfdsf',
                data: { id: 1, name: '刘小夕' }
            })
        } else {
            return res.send({ status: 'error', code: 403 })
        }
    }
}
复制代码
```

1. 修改 `webpack.config.base.js`:

```
const apiMocker = require('mocker-api');
module.export = {
    //...
    devServer: {
        before(app){
            apiMocker(app, path.resolve('./mock/mocker.js'))
        }
    }
}
复制代码
```

这样，我们就可以直接在代码中像请求后端接口一样对mock数据进行请求。

1. 重启 `npm run dev`，可以看到，控制台成功打印出来 `{name: '刘小夕'}`
2. 我们再修改下 `src/index.js`，检查下POST接口是否成功

```
//src/index.js
fetch("/login/account", {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: "admin",
        password: "888888"
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
复制代码
```

可以在控制台中看到接口返回的成功的数据

### webpack性能优化

1. 跟上技术的迭代（Node, Npm, Yarn）

2. 在尽可能少的模块上应用loader（如不对node_modules里的文件使用babel-loader，设置exclude/include）

3. Plugin 尽可能精简并确保可靠（如开发模式下不用压缩代码，使用官方认可，推荐的插件）

4. 配置resolve

   1. ```
      [string] = ['.js', '.json', '.wasm']
      ```

      尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。

      ps.不要配置太长，解析会有性能损耗

   2. 现在，替换“在导入时使用相对路径”这种方式，就像这样：

      ```
      import Utility from '../../utilities/utility';
      ```

      你可以这样使用别名：

      ```
      import Utility from 'Utilities/utility';
      ```

      也可以在给定对象的键后的末尾添加 `$`，以表示精准匹配：

   ```js
   resolve: {
       extensions: ['.js', '.json', '.wasm'], 
       alias: {
         Utilities: path.resolve(__dirname, 'src/utilities/'),
         Templates: path.resolve(__dirname, 'src/templates/'),
       },
   },
   ```

5. 使用DllPlugin拆分bundles，大幅提高打包速度

   目标：

   - 第三方模块只打包一次
   - 之后引入第三方模块的时候，要去使用dll文件

   > 我们建议 DllPlugin 只在 `entryOnly: true` 时使用，否则 DLL 中的 tree shaking 将无法工作，因为所有 exports 均可使用。

   1. `DllPlugin`此插件用于在单独的 webpack 配置中创建一个 dll-only-bundle。 此插件会生成一个名为 `manifest.json` 的文件，这个文件是用于让 [`DllReferencePlugin`](https://webpack.docschina.org/plugins/dll-plugin/#dllreferenceplugin) 能够映射到相应的依赖上。
   2. `DllReferencePlugin`会把 dll-only-bundles 引用到需要的预编译的依赖中。

6. thread-loader, parallel-webpack, happypack 多进程打包

7. 合理使用sourceMap，开发和生产环境不同的sourceMap会影响打包速度

8. 结合stats分析打包结果

9. 开发环境内存编译，如WebpackDevServer

> 参考资料

- https://coding.imooc.com/class/316.html#Anchor
- https://juejin.cn/post/6844904079219490830
- https://juejin.cn/post/6844904084927938567
- https://juejin.cn/post/6844904093463347208