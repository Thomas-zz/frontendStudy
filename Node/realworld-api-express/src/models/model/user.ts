import mongoose from "mongoose";
import baseModel from "./base-model";
import md5 from "../../util/md5";

const userSchema = new mongoose.Schema({
  // 混入基本数据字段
  ...baseModel,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // 查找的时候不会返回这个字段的值
    set: (value: string) => md5(value),  // 在存入数据库的时候，对数据做加密
  },
  bio: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
});

export default userSchema;
