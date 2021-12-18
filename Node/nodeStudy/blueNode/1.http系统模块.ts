import http from "http"

{
  const server = http.createServer((req, res) => {
    // 请求的路径
    const url = req.url;
    switch(url){
      case '/1.html':
        // 响应
        res.write('11111')
        break;
      case '/2.html':
        res.write('22222')
        break;
      default:
        res.write('404')
    }
    // 结束返回响应结果
    res.end()
  })

  // 监听端口号
  server.listen(8080)
}