const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require("path");
const babel = require('@babel/core');
const { moveCursor } = require("readline");

const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, "utf-8");
  const ast = parser.parse(content, {
    sourceType: "module",
  });
  const dependencies = {};
  traverse(ast, {
    ImportDeclaration({node}) {
      const dirname = path.dirname(filename);
      const newFile = "./" + path.join(dirname, node.source.value);
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

const makeDependenciesGraph = (entry) => {
  const entryModule = moduleAnalyser(entry);
  const graphArray = [entryModule];
  for(let i = 0; i < graphArray.length; i++){
    const {dependencies} = graphArray[i];
    if(dependencies){
      for(const key in dependencies){
        graphArray.push(moduleAnalyser(dependencies[key]))
      }
    }
  }

  const graph = {};
  graphArray.forEach((item) => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })

  return graph
}

const res = makeDependenciesGraph('./src/index.js')
console.log(res)