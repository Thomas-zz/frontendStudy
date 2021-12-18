import express from "./express";

const app = express();

app.get('/', (req, res) => {
  res.end('get /')
})

app.get('/about', (req, res) => {
  res.end('get /about')
})

app.get('/users/:userId/books/:bookId', function(req, res){
  res.end('get /users/:userId/books/:bookId')
})

app.listen(3000, () => {
  console.log('http://localhost: 3000')
})