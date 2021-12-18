import { Request, Response, NextFunction } from "express";
import { User } from "../models/model/index";
import jwt from "../util/jwt";
import { Document } from "mongoose";
import { jwtSecret } from "../config/config.default";
import { throws } from "assert";

type userType = {
  user?: Document;
};

export default {
  login: async (req: Request & userType, res: Response, next: NextFunction) => {
    try {
      // 这里的user是前面数据验证的时候挂在上去的user
      const user: any = req.user ? req.user.toJSON() : null;
      if (!user) {
        throw "error not user";
      }
      // 生成token，jwtSecret是我们定义的秘钥
      const token = await jwt.sign(
        {
          userId: user._id,
        },
        jwtSecret
      );

      // 发送成功响应
      delete user.password;
      res.status(200).json({
        ...user,
        token,
      });
    } catch (err) {
      next(err);
    }
  },
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. 获取请求体数据
      let user = new User(req.body.user);
      // 2. 数据验证，在中间件做了数据验证
      // 2.1 基本数据验证
      // 2.2 业务数据验证
      // 3. 验证通过，将数据保存到数据库
      // 保存数据到数据库
      await user.save();

      user = user.toJSON(); // 因为user是Document类型

      delete user.password; // 不想返回password给到客户端

      // 4. 发送成功响应
      res.status(201).json({
        user,
      });
    } catch (err) {
      next(err);
    }
  },
  getCurrentUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("get /user");
    } catch (err) {
      next(err);
    }
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("get /user");
    } catch (err) {
      next(err);
    }
  },
};
