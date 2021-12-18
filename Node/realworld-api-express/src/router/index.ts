import express from "express";
import userRouter from "./user";
import profileRouter from "./profile";
import articlesRouter from "./articles";
import tagsRouter from "./tags";

const router = express.Router();

// 用户相关路由
router.use(userRouter);

// 用户资料相关路由
router.use("/profiles", profileRouter);

// 文章相关路由
router.use("/articles", articlesRouter);

// 标签相关路由
router.use(tagsRouter);

export default router;
