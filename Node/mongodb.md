# Mongoose

## 建立连接

mongoose6废弃了connect方法中的`{useNewUrlParser: true, useUnifiedTopology:true}`等选项，且在mongoose6中，`connect`方法返回一个promise，而不是一个实例

```js
import mongoose from "mongoose";

const main = async () => {
  const db = mongoose.connection;
  
  // 两个回调函数，建立初始连接后，会触发回调
  db.on("error", (err) => {
    console.log("MongoDB 数据库连接失败", err);
  });

  db.once("open", () => {
    console.log("MongoDB 数据库连接成功");
  });

  // 初始连接，是个异步操作，所以应该放在后面，等挂载了回调后再执行
  try{
    await mongoose.connect("mongodb://localhost/realworld");
  }catch(err){
    console.log(err)
  }
};
```

### 错误处理

Mongoose 连接可能会发生**两类错误**。

- 初始连接出错。如果初始连接失败，Mongoose 将发出一个 'error' 事件并且承诺`mongoose.connect()`返回将被拒绝。但是，Mongoose**不会**自动尝试重新连接。

- 建立初始连接后出错。Mongoose 将尝试重新连接，并且会发出“错误”事件。

要处理初始连接错误，您应该使用`.catch()`或`try/catch`async/await。

  ```javascript
  mongoose.connect('mongodb://localhost:27017/test').
    catch(error => handleError(error));
  
  // Or:
  try {
    await mongoose.connect('mongodb://localhost:27017/test');
  } catch (error) {
    handleError(error);
  }
  ```

要在建立初始连接后处理错误，您应该侦听连接上的错误事件。但是，您仍然需要处理如上所示的初始连接错误。

  ```javascript
  mongoose.connection.on('error', err => {
    logError(err);
  });
  ```

  请注意，如果 Mongoose 失去与 MongoDB 的连接，它不一定会发出“错误”事件。`disconnected`当 Mongoose 与 MongoDB 断开连接时，您应该监听事件报告。

## 定义一个Schemas

Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的构成。

```javascript
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  import md5 from "../../util/md5";

  var blogSchema = new Schema({
    title:  String,
    author: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    },
    password: {
      type: String,
      required: true,
      select: false, // 查找的时候不会返回这个字段的值
      set: (value: string) => md5(value),  // 在存入数据库的时候，对数据做加密
    },
  });
```

在这之后你还想添加 keys 的话， 请使用 [Schema#add](http://www.mongoosejs.net/docs/api.html#schema_Schema-add) 方法。

document 里每个属性的类型都会被转换为 在 `blogSchema` 里定义对应的 [SchemaType](http://www.mongoosejs.net/docs/api.html#schematype_SchemaType)。 例如 `title` 属性会被转换为 SchemaType [String](http://www.mongoosejs.net/docs/api.html#schema-string-js)， 而 `date`属性会被转换为 SchemaType `Date`。 还可以像上面 `meta` 属性，更详细地指定嵌套在里面的属性类型。

## 创建一个model

我们要把 schema 转换为一个 [Model](http://www.mongoosejs.net/docs/models.html)， 使用 `mongoose.model(modelName, schema)` 函数：

```javascript
  var Blog = mongoose.model('Blog', blogSchema);
```

## 我的理解

我的理解是Schemas就相当于定义数据字段，model是创建一张表，也就是MongoDB collection，数据库就是由多个model组成