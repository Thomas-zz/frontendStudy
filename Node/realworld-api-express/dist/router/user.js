"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controller/user"));
const router = express_1.default.Router();
// 用户登录
router.post("/users/login", user_1.default.login);
// 用户注册
router.post("/users", user_1.default.login);
// 得到当前用户信息
router.get("/user", user_1.default.getCurrentUser);
// 更新用户信息
router.put("/user", user_1.default.updateUser);
exports.default = router;
