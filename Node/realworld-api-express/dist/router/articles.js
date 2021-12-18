"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articles_1 = __importDefault(require("../controller/articles"));
const router = express_1.default.Router();
// list Articles
router.get("", articles_1.default.getArticlesList);
// Feed Articles
router.get("/feed", articles_1.default.feedArticles);
// Get Article
router.delete("/:slug", articles_1.default.getArticle);
// Create Article
router.post("", articles_1.default.createArticle);
// Update Article
router.put("/:slug", articles_1.default.updateArticle);
// Delete Article
router.delete("/:slug", articles_1.default.deleteArticle);
// Add Comments to an Article
router.post("/:slug/comments", articles_1.default.addComments);
// Get Comments from an Article
router.get("/:slug/comments", articles_1.default.getComments);
// Delete Comment
router.delete("/:slug/comments/:id", articles_1.default.deleteComment);
// Favorite Article
router.post("/:slug/favorite", articles_1.default.favoriteArticle);
// Unfavorite Article
router.delete("/:slug/favorite", articles_1.default.unfavoriteArticle);
exports.default = router;
