// 从axios(config)的使用上可以看出导出的axios是一个方法。
// 从axios.method(url, data , config)的使用可以看出导出的axios上或者原型上挂有get，post等方法。
class Axios {
  constructor() {
    this.interceptors = {
      request: new InterceptorsManage(),
      response: new InterceptorsManage(),
    };
  }

  request(config) {
    // 拦截器和请求组装队列
    let chain = [this.sendAjax.bind(this), undefined];

    // 请求拦截
    this.interceptors.request.handlers.forEach((interceptor) => {
      chain.unshift(interceptor.fullfield, interceptor.rejected);
    });

    // 响应拦截
    this.interceptors.response.handlers.forEach((interceptor) => {
      chain.push(interceptor.fullfield, interceptor.rejected);
    });

    // 执行队列，每次执行一对
    let promise = Promise.resolve(config);
    while (chain.length > 0) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }
  
  sendAjax(config) {
    return new Promise((resolve) => {
      const { url = "", method = "get", data = {} } = config;
      // 发送ajax请求
      const xhr = new XMLHttpRequest();
      // true 表示异步模式
      xhr.open(method, url, true);
      xhr.onload = function () {
        console.log(xhr.responseText);
        resolve(xhr.responseText);
      };
      xhr.send(data);
    });
  }
}

// 实现axios.method形式
const methodsArr = ["get", "delete", "head", "options", "put", "patch", "post"];
methodsArr.forEach((met) => {
  Axios.prototype[met] = function () {
    console.log("执行" + met + "方法");
    // 两个参数的方法
    if (["get", "delete", "head", "options"].includes(met)) {
      return this.request({
        method: met,
        url: arguments[0],
        ...(arguments[1] || {}),
      });
    } else {
      // 三个参数的方法
      return this.request({
        method: met,
        url: arguments[0],
        data: arguments[1] || {},
        ...(arguments[2] || {}),
      });
    }
  };
});

// 工具方法，实现b的方法或属性混入a;
// 方法也要混入进去
const utils = {
  extend(a, b, context) {
    for (let key in b) {
      if (b.hasOwnProperty(key)) {
        if (typeof b[key] === "function") {
          a[key] = b[key].bind(context);
        } else {
          a[key] = b[key];
        }
      }
    }
  },
};

// 拦截器类，管理响应和请求
class InterceptorsManage {
  constructor() {
    this.handlers = [];
  }

  use(fullfield, rejected) {
    this.handlers.push({
      fullfield,
      rejected,
    });
  }
}

// 最终导出axios的方法-》即实例的request方法
function CreateAxiosFn() {
  let axios = new Axios();
  let req = axios.request.bind(axios);

  // 增加这行代码
  utils.extend(req, Axios.prototype, axios);
  utils.extend(req, axios);
  return req;
}

// 得到最后的全局变量axios
let axios = CreateAxiosFn();
