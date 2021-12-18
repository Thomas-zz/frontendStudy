import jwt from "jsonwebtoken";
import { promisify } from "util";

const promisifyJWT = {
  sign: promisify(jwt.sign),

  verify: jwt.verify,

  decode: promisify(jwt.decode),
};

export = promisifyJWT;
