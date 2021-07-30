# Webpack

> 模块打包工具

## 模块引入规范

- ES Moudle
  - 导入：import xx from './...'
  - 导出：export default XXX
  - 底层是静态引入
  - ES6 Module输出的是值的引用
- Common Js
  - 导入：var XXX = require('./...')
  - 导出：module.exports = XXX
  - 底层是动态引入
  - `require`返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值
- CMD
- ADM

打包命令：```npm xxx.js```

## 安装方式

### 事前准备

- 安装nodejs
- 安装npm
- 在目录文件初始化，npm init
- <img src="E:\frontendStudy\Webpack\WebPack.assets\image-20210711104735820.png" alt="image-20210711104735820" style="zoom:67%;" />

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

>  loader就是一个打包方案，对文件进行预处理，告诉webpack该如何打包

### file-loader

可以打包图片,txt等静态资源

```npm install file-loader --save-dev``` ```--save-dev = -D```

```js
...
module: {
    rules: [{
        test: /\.(jpg|png|gif)$/,
        use: {
            loader: 'file-loader',
            options: {
            //placeholder 占位符，[ext]表示test匹配的字符串
            //更多的占位符参考webpack文档
            name: '[name].[ext]',
            outputPath: 'images/' //输出的路径
        },
    }]
},
...
```

### url-loader

```npm install url-loader --save-dev``` 

会将打包的图片生成一个base64位的字符串，放到js中

优点：直接将文件打包在js中，js加载完成，图片就出来了，不用再有额外的请求

缺点：如果一个图片非常大，会使js文件非常大，加载时间变大

**应用：**只有几kb的文件可以打包在bundle.js中，减少http请求

```js
...
module: {
    rules: [{
        test: /\.(jpg|png|gif)$/,
        use: {
            loader: 'url-loader'
        },
        options: {
            name: '[name].[ext]',
            outputPath: 'images/', //输出的路径
            limit: 10240  //小于10kb的文件应用url-loader
        }
    }]
},
...
```

### 打包css文件

#### style-loader和css-loader

css-loader：分析几个css文件中的关系，并打包成一个css文件

style-loader：将打包得到的css文件挂载到页面的header部分

#### sass-loader

```npm install sass-loader node-sass --save-dev```

#### postcss-loader

在css一些属性前增加厂商前缀，以兼容不同浏览器

使用postcss-loader需要配置postcss.config.js文件

```js
module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {},
        'cssnano': {}
    }
}
```

使用autoprefixer插件帮我们配置

```npm install autoprefixer -D```

```js
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```



```js
{
    test: /\.scss$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2,  //这句的作用是保证scss文件中引入的其他scss文件也会从下到上走下面两个loader
                modules: true,  //开启css模块化打包，
            }
        },
        'sass-loader',
        'postcss-loader'
    ]
}
```

loader的执行顺序是从下到上，从右到左

### 使用plugins

> 插件，可以在webpack运行到某个时刻的时候，帮我们做某些事

#### HtmlWebpackPlugin

会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件，默认放到head中

```bash
npm install --save-dev html-webpack-plugin
```

```js
const HtmlWebpackPlugin
...
plugins: [new HtmlWebpackPlugin({
    //可选，模板文件
    template: 'src/index.html'
})]
...
```

#### clean-webpack-plugin

可以在打包前帮我们删除原有的打包文件

`npm install clean-webpack-plugin -D`

```js
//引入要进行解构
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
...
//默认会删除打包目录下未使用的资源
plugins: [new CleanWebpackPlugin()],
...
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
      //使用占位符配置出口路径，确保每个文件有唯一名字
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};
```



### devtool（source-map）

**devtool**

- eval速度最快，但不一定准确
- cheap只告诉我们错误在哪一行，不会指出在哪一列
- module不止管我们也业务代码，也会管第三方模块
- inline不单独生成一个.map文件，在打包好的js中以base64位映射

配置建议：

- development devtool：eval-cheap-module-source-map
- production devtool：cheap-module-source-map,或不配

### WebpackDevServer

会将dist目录放在内存中，加快打包速度

热更新：

- webpack --watch

- webpack serve --open   会以服务器形式打开

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

- 在node中配置

  - `npm install express webpack-dev-middleware -D`
  - <img src="E:\frontendStudy\Webpack\WebPack.assets\image-20210718224230492.png" alt="image-20210718224230492" style="zoom:40%;" />

### Hot Module Replacement

`HMR 热模块替换`  

> 会在应用程序运行过程中，替换、添加或删除 [模块](https://webpack.docschina.org/concepts/modules/)，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：
>
> - 保留在完全重新加载页面期间丢失的应用程序状态。
> - 只更新变更内容，以节省宝贵的开发时间。
> - 在源代码中 CSS/JS 产生修改时，会立刻在浏览器中进行更新，这几乎相当于在浏览器 devtools 直接更改样式

webpack.config.js

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



如果要使用js的HMR，还需要在添加一些配置，如在index.js下添加

```js
if (module.hot) {
    module.hot.accept('./number', () => {
        document.body.removeChild(document.getElementById('number'));
        number();
    })
}
```



### Babel

能够帮我们把ES6语法转为ES5语法，以适应低版本浏览器

1. 安装Babel  `npm install --save-dev babel-loader @babel/core`

2. 配置rules

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

3. 继续配置babel.config.json文件  `npm install @babel/preset-env --save-dev`

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

4. 配置其参数按需打包，减小打包后的体积

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



## webpack的高级概念

### Tree Shaking

直译为摇树，打包时把一个模块里没用的部分摇晃掉，只支持ES Module形式引入的文件

- 在developement下不会删除没用到的代码，为的是方便调试

  - ```js
    ...//在配置文件中打开Tree Shaking    
    optimization: {
        usedExports: true
    }
    ...
    ```

  - 在package.json下配置哪些文件不需要Tree Shaking

    ```js
    {
        "name": "lesson",
        "sideEffects": false,
        //"sideEffects": "*.css",血的教训
    }
    ```

    

- 在production下会自动帮我们配置Tree Shaking，并且打包后的文件只有我们需要的代码

### 开发模式和生产模式的区分打包

1. 创建两个配置文件，一个为`webpack.dev.js`，一个为`webpack.prod.js`，分别是开发环境下和生产环境下的配置文件

2. 在package.json文件中设置打包语句

   1. `"build": "webpack --config webpack.prod.js"`
   2. `"dev": "webpack serve --open --config webpack.dev.js"`

3. 但这样我们两个配置文件中会有大量重复的配置，且这部分配置一个修改另一个也要手动修改，所以我们可以把它们的公共部分提取出来，命名为`webpack.common.js`

4. 合并`webpack.common.js`需要用到一个插件叫`webpack=merge`，命令行下载`npm install webpack-merge -D`

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

### Code Splitting 代码分割

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

### prefetch和preload

在声明 import 时，使用下面这些内置指令，可以让 webpack 输出 "resource hint(资源提示)"，来告知浏览器：

- **prefetch**(预获取)：将来某些导航下可能需要的资源
- **preload**(预加载)：当前导航下可能需要资源

下面这个 prefetch 的简单示例中，有一个 `HomePage` 组件，其内部渲染一个 `LoginButton` 组件，然后在点击后按需加载 `LoginModal` 组件。

**LoginButton.js**

```js
//...
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
```

这会生成 `<link rel="prefetch" href="login-modal-chunk.js">` 并追加到页面头部，指示着浏览器在闲置时间预取 `login-modal-chunk.js` 文件。

#### Tip

- **prefetch**(预获取)：将来某些导航下可能需要的资源
- **preload**(预加载)：当前导航下可能需要资源

只要父 chunk 完成加载，webpack 就会添加 prefetch hint(预取提示)。

与 prefetch 指令相比，preload 指令有许多不同之处：

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
- 浏览器支持程度不同。

**我的理解**

在需要的时候才异步加载js能够提高我们页面的代码利用率，加快首页展示速度，但是每个需求只有在我们需要的时候才去请求js文件，会影响我们的交互体验。而prefetch能够解决这个问题，它能在我们页面主要文件加载完成后，利用网络空闲的时间加载我们可能需要的js文件（预获取），这样当我们使用到这部分功能时，能够快速的从缓存获取到这部分js文件。

### CSS文件的代码分割

#### mini-css-extract-plugin

> 一般css文件会和js文件打包在一起，此插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。

首先，你需要安装 `mini-css-extract-plugin`：

```bash
npm install --save-dev mini-css-extract-plugin
```

建议 `mini-css-extract-plugin` 与 [`css-loader`](https://webpack.docschina.org/loaders/css-loader/) 一起使用。

之后将 loader 与 plugin 添加到你的 `webpack` 配置文件中。 例如：

**style.css**

```css
body {
  background: green;
}
```

**component.js**

```js
import "./style.css";
```

**webpack.config.js**

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

### 浏览器缓存

contenthash是一个占位符，若我们文件有更改，contenthash的值会改变，这样在我们文件更新的时候，刷新浏览器就能拿到更新后的文件。否则即便的文件已经更新，但文件名没变，浏览器会从缓存里读取文件

```js
output: [
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
]
```

### shimming（垫片）

解决webpack打包过程中的兼容性问题，如lodash，jquery

webpack中，模块之间的变量是隔离的

```js
const webpack = require('webpack')
plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery'
    })
  ],
```

我们本质上所做的，就是告诉 webpack……

> 如果你遇到了至少一处用到 `_` 变量的模块实例，那请你将 `lodash` package 引入进来，并将其提供给需要用到它的模块。

### 环境变量的使用

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

## webpack实战配置

### Library的打包

当我们写库函数的时候，如果想要我们的库能够被其他人引入使用，我们需要通过 [`output.library`](https://webpack.docschina.org/configuration/output/#outputlibrary) 配置项暴露从入口导出的内容。

```js
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
      library: "webpackNumbers",   //看这里
    },
  };

```

然而它只能通过被 script 标签引用而发挥作用，它不能运行在 CommonJS、AMD、Node.js 等环境中。

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



### 使用devServer实现请求转发

`devServer.proxy` 

当我们在**开发环境**中调试的时候，代理某些URL可能会很有用，我们就不需要逐条去修改请求里的地址

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

默认情况下，将不接受在 HTTPS 上运行且证书无效的后端服务器。 如果需要，可以这样修改配置：

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


有的网站对Origin做了限制，防止爬虫，将changeOrigin` 设置为 `true可以突破这个限制
