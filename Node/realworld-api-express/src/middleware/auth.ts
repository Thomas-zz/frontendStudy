import { Request, Response, NextFunction } from "express";
import jwt from "../util/jwt";
import { jwtSecret } from "../config/config.default";
import { User } from "../models/model";
import { Document } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

type userType = {
  user?: Document;
};

type userId = {
  userId?: string;
};

export default async (
  req: Request & userType,
  res: Response,
  next: NextFunction
) => {
  // 从请求头获取token数据
  let token = req.headers["authorization"];
  token = token ? token.split("Bearer ")[1] : undefined;

  if (!token) {
    return res.status(401).end();
  }

  try {
    const decodedToken: (string | JwtPayload) & userId = jwt.verify(
      token,
      jwtSecret
    );
    console.log(decodedToken);
    req.user = await User.findById(decodedToken.userId);
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(401).end();
  }
};
