// 从axios(config)的使用上可以看出导出的axios是一个方法。
// 从axios.method(url, data , config)的使用可以看出导出的axios上或者原型上挂有get，post等方法。
class Axios {
  constructor() {}

  request(config) {
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

function CreateAxiosFn() {
  let axios = new Axios();
  let req = axios.request.bind(axios);
  return req;
}

let axios = CreateAxiosFn();
