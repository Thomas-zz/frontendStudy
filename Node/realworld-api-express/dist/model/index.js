"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const main = () => {
    mongoose_1.default.connect("mongodb://localhost/realworld");
    const db = mongoose_1.default.connection;
    console.log("hi");
    db.on("error", (err) => {
        console.log("MongoDB 数据库连接失败", err);
    });
    db.once("open", () => {
        console.log("MongoDB 数据库连接成功");
    });
};
exports.default = main;
