import methods from "methods";
import pathRegexp from "path-to-regexp";
import Layer from "./layer";

type keysType = {
  name: string;
  optional: boolean;
  offset: number;
};

function Router() {
  this.routes = [];
}

methods.forEach((method: string) => {
  Router.prototype[method] = function (path: string, handler) {
    const layer = new Layer(path, handler);
    layer.method = method;
    this.routes.push(layer);
  };
});

Router.prototype.handler = function (req, res) {
  const { pathname } = new URL(<string>req.url, "http://localhost:3000/");
  const method = req.method?.toLowerCase();
  // 匹配路由
  const layer = this.routes.find((layer) => {
    // // 存放动态路由路径参数
    // const keys: keysType[] = [];
    // const regexp = pathRegexp(layer.path, keys, {});
    // 解析到的路径信息
    const match = layer.match(pathname);
    // console.log("keys => ", keys);
    // console.log("match => ", match);
    if (match) {
      req.params = req.params || {};
      Object.assign(req.params, layer.params);
    }
    return match && layer.method === method;
  });
  if (layer) {
    // 执行回调
    return layer.handler(req, res);
  }
  res.end("404 Not Found");
};

export default Router;
