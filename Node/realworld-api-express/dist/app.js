"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./router/index"));
const index_2 = __importDefault(require("./model/index"));
const app = (0, express_1.default)();
// 打印日志
app.use((0, morgan_1.default)("dev"));
// 解析请求体
app.use(express_1.default.json());
// 配置跨域
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 8080;
app.use('/api', index_1.default);
(0, index_2.default)();
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
