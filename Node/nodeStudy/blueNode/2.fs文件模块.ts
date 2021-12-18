import http from "http"
import fs from "fs"
import path from "path";

// 将文件放在www资源目录下，与服务器分开，这样每次资源更新，服务器不用重启
{
  const server = http.createServer((req, res) => {
    const file_name = path.join(__dirname, 'www', req.url);
    // 读文件默认从根路径开始读，所以我们用path转为绝对路径
    fs.readFile(file_name, (err, data)=>{
      if(err){
        console.log(err)
        res.write('404')
      }else{
        res.write(data)
      }
      res.end()
    })
  })

  // 监听端口号
  server.listen(8080)
}