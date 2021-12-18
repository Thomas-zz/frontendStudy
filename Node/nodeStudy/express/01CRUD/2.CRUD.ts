import express from "express";
import { getDb, saveDb } from "./db/db";

const app = express();
const port = 8080;

interface dbType {
  todos: [
    {
      id: number;
      title: string;
    }
  ];
  users: [];
}

// 配置解析表单请求体：application/json
app.use(express.json());

// 配置解析表单请求体：application/x-www-form-urlencoded
app.use(express.urlencoded());

// 查找todos列表
app.get("/todos", async (req, res) => {
  try {
    const db = await getDb();
    res.status(200).json(db.todos);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// 根据id获取单个任务
app.get("/todos/:id", async (req, res) => {
  try {
    const db: dbType = await getDb();
    const todo: object = db.todos.find(
      (todo: { id?: number }) => todo.id === +req.params.id
    );
    if (!todo) {
      return res.status(404).end();
    }
    res.status(200).json(todo);
  } catch (err: any) {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
});

// 添加数据
app.post("/todos", async (req, res) => {
  try {
    // 1. 获取客户端请求体参数
    const todo = req.body;

    // 2. 数据验证
    if (!todo.title) {
      // 请求格式正确，但是出现语义错误
      return res.status(422).json({
        error: "The field title is required",
      });
    }

    // 3. 验证通过，存储数据
    const db: dbType = await getDb();

    const lastTodo = db.todos[db.todos.length - 1];
    todo.id = lastTodo ? lastTodo.id + 1 : 1;
    db.todos.push(todo);
    await saveDb(db);

    // 4. 发送响应
    res.status(201).json(todo);
  } catch (err: any) {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
});

// 修改数据
app.patch("/todos/:id", async (req, res) => {
  try {
    const todo = req.body;
    const db: dbType = await getDb();
    const ret = db.todos.find((todo) => todo.id === +req.params.id);

    if (!ret) {
      return res.status(404).end();
    }

    Object.assign(ret, todo)

    await saveDb(db);
    res.status(200).json(ret);
  } catch (err:any) {
    res.status(500).json({
      error: err.message
    })
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const db: dbType = await getDb();
    const todoId = +req.params.id;
    const index = db.todos.findIndex((todo) => todo.id === todoId);
    if (index === -1) {
      return res.status(404).end();
    }
    db.todos.splice(index, 1);
    await saveDb(db);
    res.status(204).end({
      success: 'Delete succeeded'
    });
  } catch (err:any) {
    res.status(500).json({
      error: err.message
    })
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
