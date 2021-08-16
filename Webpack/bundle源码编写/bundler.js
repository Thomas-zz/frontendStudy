// 帮我们做文件分析
const fs = require('fs');
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default;
const path = require('path');
const babel = require('@babel/core');

const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module'
  });
  const dependencies = {};
  traverse(ast, {
    // 对引入语法的节点执行下面的方法
    ImportDeclaration({node}) {
      // 这里是要拿到绝对路径
      const dirname = path.dirname(filename);
      // node.source.value是一个相对路径
      const newFile = './' + path.join(dirname, node.source.value);
      // 为了方便我们后续处理，相对路径和绝对路径我们都需要
      dependencies[node.source.value] = newFile;
    }
  })
  const { code } = babel.transformFromAst(ast, null, {
		presets: ["@babel/preset-env"]
	});
  return {
		filename,
		dependencies,
		code
	}
}

// 递归获取所有依赖模块信息
const makeDependenciesGraph = (entry) => {
	const entryModule = moduleAnalyser(entry);
	const graphArray = [ entryModule ];
	for(let i = 0; i < graphArray.length; i++) {
		const { dependencies } = graphArray[i];
		if(dependencies) {
			for(const key in dependencies) {
				graphArray.push(
					moduleAnalyser(dependencies[key])
				);
			}
		}
	}

  // 对结果进行处理
	const graph = {};
	graphArray.forEach(item => {
		graph[item.filename] = {
			dependencies: item.dependencies,
			code: item.code
		}
	});
	return graph;
}

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
	`
}

// 我们要分析哪个入口文件
const code = generateCode('./src/index.js');
console.log(makeDependenciesGraph('./src/index.js'))
console.log(code);