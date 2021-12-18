"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const profile_1 = __importDefault(require("./profile"));
const articles_1 = __importDefault(require("./articles"));
const tags_1 = __importDefault(require("./tags"));
const router = express_1.default.Router();
// 用户相关路由
router.use(user_1.default);
// 用户资料相关路由
router.use("/profiles", profile_1.default);
// 文章相关路由
router.use("/articles", articles_1.default);
// 标签相关路由
router.use(tags_1.default);
exports.default = router;
