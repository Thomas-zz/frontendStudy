## 编写一个webpack的bundle

手写bundle能够帮助我们对webpack的打包流程有个比较清晰的认识，对于webpack的学习有着很大的帮助，接下来跟着文章来手写一个bundle吧

## 一、初始化项目

创建初始文件夹 src，创建三个文件`index.js`,`message.js`,`word.js`，三个文件有着简单的调用关系。这时候我们执行`index.js`肯定是不成的，因为它无法识别 import

```js
//index.js
import {message} from './message.js';

console.log(message);
```

```js
//message.js
import {word} from "./word.js";

export const message = `hello ${word}`;
```

```js
//word.js
export const word = "world";
```

执行index.js :

![image-20210810153310098](E:\frontendStudy\Webpack\bundle源码编写\bundle源码编写.assets\image-20210810153310098.png)

## 二、获取模块内容

要想这段代码正常运行，我们需要在根目录下编写一个 bundler，帮助我们进行打包分析
首先要分析我们的入口文件

```js
// 帮我们做文件分析
const fs = require("fs");

const moduleAnalyser = (filename) => {
  content = fs.readFileSync(filename, "utf-8");
  console.log(content);
};

// 我们要分析哪个入口文件
moduleAnalyser("./src/index.js");
```

在控制台执行查看输出，可以看到已经拿到这个入口文件了

![image-20210810154736351](E:\frontendStudy\Webpack\bundle源码编写\bundle源码编写.assets\image-20210810154736351.png)

觉得黑色不太好看的话，我们可以执行`npm install cli-highlight -g`，这是一高亮显示代码的工具

再执行一次我们的代码

![image-20210810155102370](E:\frontendStudy\Webpack\bundle源码编写\bundle源码编写.assets\image-20210810155102370.png)

## 三、获取模块依赖

在拿到模块内容后，我们需要对模块依赖进行处理，这里我们可以用字符串分割来获取 import 到的模块依赖，但这样就太不方便了

我们可以使用 babel 提供的工具`@babel/parser`帮助我们进行分析

`npm install @babel/parser --save`

```js
// 帮我们做文件分析
const fs = require("fs");
const parser = require("@babel/parser");

const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, "utf-8");
  console.log(
    parser.parse(content, {
      sourceType: "module",
    })
  );
};

// 我们要分析哪个入口文件
moduleAnalyser("./src/index.js");
```

观察打印结果

![image-20210810155820699](E:\frontendStudy\Webpack\bundle源码编写\bundle源码编写.assets\image-20210810155820699.png)

实际上这个打印结果就是我们常说的抽象语法树 AST

对`bundler`进行修改

```js
const ast = parser.parse(content, {
  sourceType: "module",
});
console.log(ast.program.body);
```

观察打印结果，我们的入口文件有两个节点，第一个是`ImportDeclaration`引入语法，第二个节点是`ExpressionStatement`，也就是一个表达式

![image-20210810160508203](E:\frontendStudy\Webpack\bundle源码编写\bundle源码编写.assets\image-20210810160508203.png)

抽象语法树很好的帮助我们把代码转化为了一个对象，拿到对象后应该干嘛呢？对了，应该对对象进行分析了

## 四、分析 AST,收集依赖

我们使用`traverse`帮助我们进行分析
`npm install @babel/traverse --save`

修改我们的代码

```js
// 帮我们做文件分析
const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require("path");

const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, "utf-8");
  const ast = parser.parse(content, {
    sourceType: "module",
  });
  const dependencies = {};
  traverse(ast, {
    // 对引入语法的节点执行下面的方法
    ImportDeclaration({ node }) {
      // 这里是要拿到绝对路径
      const dirname = path.dirname(filename);
      // node.source.value是一个相对路径
      const newFile = "./" + path.join(dirname, node.source.value);
      // 为了方便我们后续处理，相对路径和绝对路径我们都需要
      dependencies[node.source.value] = newFile;
    },
  });
  console.log(dependencies);
};

// 我们要分析哪个入口文件
moduleAnalyser("./src/index.js");
```

执行结果：![image-20210810162740311](E:\frontendStudy\Webpack\bundle源码编写\bundle源码编写.assets\image-20210810162740311.png)

至此我们就分析出了依赖的路径，将它 return 回去

```js
...
console.log(dependencies);
return {
  filename,
  dependencies
}
...
```

## 五、将 AST 转为 ES5 语法

`npm install @babel/core --save`

`npm install @babel/preset-env --save`

使用 babel 的工具将我们的代码转为 ES5 语法

```js
// 帮我们做文件分析
...
const babel = require('@babel/core');

const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module'
  });
  ...
  const { code } = babel.transformFromAst(ast, null, {
		presets: ["@babel/preset-env"]
	});
  return {
		filename,
		dependencies,
		code
	}
}

// 我们要分析哪个入口文件
const moduleInfo = moduleAnalyser('./src/index.js');
console.log(moduleInfo);
```

执行结果：

![image-20210810165552833](E:\frontendStudy\Webpack\bundle源码编写\bundle源码编写.assets\image-20210810165552833.png)

到这为止我们就成功分析了入口文件的代码

## 六、递归分析所有依赖

上一步我们分析了入口文件，但入口文件导入的依赖还没有分析，那要怎么获取一个模块里面所有依赖模块的信息呢？

在这里，我们使用递归来分析所有依赖

```js
// 递归获取所有依赖模块信息
const makeDependenciesGraph = (entry) => {
  const entryModule = moduleAnalyser(entry);
  const graphArray = [entryModule];
  // 对依赖数组进行遍历
  for (let i = 0; i < graphArray.length; i++) {
    // 拿到当前遍历到的依赖的所有依赖
    const { dependencies } = graphArray[i];
    // 对拿到的依赖做分析，加入依赖数组
    if (dependencies) {
      for (const key in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[key]));
      }
    }
  }

  // 对结果进行处理
  const graph = {};
  graphArray.forEach((item) => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code,
    };
  });
  return graph;
};
```

添加递归后我们的 bundler：

```js
// 帮我们做文件分析
const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require("path");
const babel = require("@babel/core");

// 分析一个模块
const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, "utf-8");
  const ast = parser.parse(content, {
    sourceType: "module",
  });
  const dependencies = {};
  traverse(ast, {
    // 对引入语法的节点执行下面的方法
    ImportDeclaration({ node }) {
      // 这里是要拿到绝对路径
      const dirname = path.dirname(filename);
      // node.source.value是一个相对路径
      const newFile = "./" + path.join(dirname, node.source.value);
      // 为了方便我们后续处理，相对路径和绝对路径我们都需要
      dependencies[node.source.value] = newFile;
    },
  });
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  return {
    filename,
    dependencies,
    code,
  };
};

// 递归获取所有依赖模块信息
const makeDependenciesGraph = (entry) => {
  const entryModule = moduleAnalyser(entry);
  const graphArray = [entryModule];
  for (let i = 0; i < graphArray.length; i++) {
    const { dependencies } = graphArray[i];
    if (dependencies) {
      for (const key in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[key]));
      }
    }
  }

  // 对数组结果进行处理，方便我们之后的操作
  const graph = {};
  graphArray.forEach((item) => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code,
    };
  });
  return graph;
};

// 我们要分析哪个入口文件
const graghInfo = makeDependenciesGraph("./src/index.js");
console.log(graghInfo);
```

拿到所有依赖模块的信息：

![image-20210810172122701](E:\frontendStudy\Webpack\bundle源码编写\bundle源码编写.assets\image-20210810172122701.png)

## 七、生成能在浏览器真正运行的代码

注意看我们拿到的依赖对应的执行代码

![image-20210815144731182](E:\frontendStudy\Webpack\bundle源码编写\bundle源码编写.assets\image-20210815144731182.png)

我们浏览器是不能直接执行这些代码的，因为它识别不出`require`和`exports`，我们要对这些代码做处理



```js
const generateCode = (entry) => {
  // 将递归得到的依赖转为JSON
  const graph = JSON.stringify(makeDependenciesGraph(entry));

  // 返回一个立即执行函数，传入依赖，分析依赖并执行对应的代码片段
  return `
	    (function(graph){
			function require(module){
				function localRequire(relativePath){
					return require(graph[module].dependencies[relativePath]);
				}
				var exports = {};
				(function(require, exports, code){
					eval(code);
				})(localRequire, exports, graph[module].code);
				return exports;
			};
			require('${entry}');
		})(${graph})
	`;
};

// 我们要分析哪个入口文件
const code = generateCode("./src/index.js");
console.log(code);
```

运行代码，将执行结果复制到浏览器控制台中，查看输出结果

![image-20210815145113556](E:\frontendStudy\Webpack\bundle源码编写\bundle源码编写.assets\image-20210815145113556.png)
能看到我们bundler生成的代码可以被浏览器正确执行~