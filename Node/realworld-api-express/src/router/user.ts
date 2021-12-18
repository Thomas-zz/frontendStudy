import express from "express";
import userCtrl from "../controller/user";
// 校验规则
import userValidator from "../validator/user";
// jwt校验
import auth from "../middleware/auth";

const router = express.Router();

// 用户登录
router.post("/users/login", userValidator.login, userCtrl.login);

// 用户注册
router.post("/users", userValidator.register, userCtrl.register);

// 得到当前用户信息
router.get("/user", auth, userCtrl.getCurrentUser);

// 更新用户信息
router.put("/user", auth, userCtrl.updateUser);

export default router;
