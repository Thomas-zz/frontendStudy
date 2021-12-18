import express from "express";
import tagsCtrl from "../controller/tags"

const router = express.Router();

// Get Tags
router.get('/api/tags', tagsCtrl.login)

export default router