# 解读Axios源码，手写Axios核心原理

## Axios简介

Axios是一个基于Promise的HTTP库，支持浏览器和node.js环境。下面我们一边读Axios源码，一边实现一个自己的axios

### Axios特性

- 基于Promise
- 支持浏览器（XMLHttpRequest）和 node.js（http）环境
- 可添加请求、转换请求和响应数据
- 可拦截请求
- 可取消请求
- 自动转换JSON数据
- 客户端支持防御XSRF

## 实现一个能用的Axios

axios的使用方式有

1. axios(config)
2. axios.method(url, data, config)

再观察axios入口文件

```js
var utils = require('./utils');
var bind = require('./helpers/bind'); // 注意这里
var Axios = require('./core/Axios'); // 注意这里
var mergeConfig = require('./core/mergeConfig'); // 注意这里
var defaults = require('./defaults');

// 创建axios实例的方法
function createInstance(defaultConfig) {
  // 根据默认配置构建个上下文对象，包括默认配置和请求、响应拦截器对象
  var context = new Axios(defaultConfig);
  // 创建实例 bind这个工具方法我们后面会讲
  var instance = bind(Axios.prototype.request, context);
  // 拷贝prototype到实例上 类似于把Axios的原型上的方法(例如: request、get、post...)继承到实例上，this指向为context
  utils.extend(instance, Axios.prototype, context);
  // 拷贝上下文对象属性(默认配置和请求、相应拦截器对象)到实例上， this指向为context
  utils.extend(instance, context);
  
  // 创建axios实例，一般axios封装 应该都会用到 （我们把一些默认、公共的配置都放到一个实例上，复用实例，无需每次都重新创建实例）
  instance.create = function create(instanceConfig) {
    // 这里mergeConfig 就是用来深度合并的
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

	// 返回实例
  return instance;
}

// 创建实例 defaulst为默认配置 
var axios = createInstance(defaults);

// 向外暴露Axios类，可用于继承 （本人暂未使用过）
axios.Axios = Axios;

// 这里抛出 中断/取消请求的相关方法到入口对象
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// 并发请求 完全就是用promise的能力
axios.all = function all(promises) {
  return Promise.all(promises);
};
// 和axios.all 共同使用,单个形参数组参数转为多参 =====> 后面有详解！！！
axios.spread = require('./helpers/spread');

// 用作监测是否为Axios抛出的错误
axios.isAxiosError = require('./helpers/isAxiosError');
// 导出
module.exports = axios;

// 允许在ts中使用默认导出
module.exports.default = axios;

```

