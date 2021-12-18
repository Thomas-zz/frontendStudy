import http from "http";
// 以下两个是旧版，现在不推荐使用
// import urlLib from "url"
// import querystring from "querystring";

{
  const server = http.createServer((req, res) => {
    // GET方法
    let data = new URL(req.url, "http://localhost:8080/");
    const url = data.pathname;
    const GET = data.searchParams;

    // POST方法，这里用str拼接其实不好，但方便我们看结果
    let str = "";
    // post的content可以很大，可能会分多段接收，为的是接收时不阻塞其他操作
    req.on('data',(data)=>{
      str+=data;
    })
    // 当数据都接收完毕
    req.on('end', ()=>{
      let POST = new URLSearchParams(str);
      console.log(url, GET, POST)
    })
    res.write('sucess')
    res.end()

  });

  server.listen(8080);
}
