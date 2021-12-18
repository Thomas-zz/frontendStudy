import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router/index";
import mongooseMain from "./models/connection";
import errorHandler from "./middleware/error-handler";
const app = express();

// 打印日志
app.use(morgan("dev"));

// 解析请求体
app.use(express.json());

// 配置跨域
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use("/api", router);

app.use(errorHandler());

mongooseMain();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
