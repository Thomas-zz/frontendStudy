import http from "http";
import Router from "./router";
import methods from "methods";

function App() {
  this._router = new Router();
}

methods.forEach((method: string) => {
  App.prototype[method] = function (path: string, handler) {
    this._router[method](path, handler);
  };
});


// 监听端口号，匹配路由
App.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    this._router.handler(req, res);
  });
  server.listen(...args);
};

export default App;
