import express from "express";
import articleCtrl from "../controller/articles"

const router = express.Router();

// list Articles
router.get("", articleCtrl.getArticlesList);

// Feed Articles
router.get("/feed", articleCtrl.feedArticles);

// Get Article
router.delete("/:slug", articleCtrl.getArticle);

// Create Article
router.post("", articleCtrl.createArticle);

// Update Article
router.put("/:slug", articleCtrl.updateArticle);

// Delete Article
router.delete("/:slug", articleCtrl.deleteArticle);

// Add Comments to an Article
router.post("/:slug/comments", articleCtrl.addComments);

// Get Comments from an Article
router.get("/:slug/comments", articleCtrl.getComments);

// Delete Comment
router.delete("/:slug/comments/:id", articleCtrl.deleteComment);

// Favorite Article
router.post("/:slug/favorite", articleCtrl.favoriteArticle);

// Unfavorite Article
router.delete("/:slug/favorite", articleCtrl.unfavoriteArticle);

export default router;
