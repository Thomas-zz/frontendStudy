import mongoose from "mongoose";
import { dbUri } from "../config/config.default";

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
  try {
    await mongoose.connect(dbUri);
  } catch (err) {
    console.log(err);
  }
};

export default main;
