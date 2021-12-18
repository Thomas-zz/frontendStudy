import { Request, Response, NextFunction } from "express";

export default {
  getArticlesList: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("GET /api/articles");
    } catch (err) {
      next(err);
    }
  },
  feedArticles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("GET /api/articles/feed");
    } catch (err) {
      next(err);
    }
  },
  getArticle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("GET /api/articles/:slug");
    } catch (err) {
      next(err);
    }
  },
  createArticle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("POST /api/articles");
    } catch (err) {
      next(err);
    }
  },
  updateArticle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("PUT /api/articles/:slug");
    } catch (err) {
      next(err);
    }
  },
  deleteArticle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("DELETE /api/articles/:slug");
    } catch (err) {
      next(err);
    }
  },
  addComments: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("POST /api/articles/:slug/comments");
    } catch (err) {
      next(err);
    }
  },
  getComments: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("GET /api/articles/:slug/comments");
    } catch (err) {
      next(err);
    }
  },
  deleteComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("DELETE /api/articles/:slug/comments/:id");
    } catch (err) {
      next(err);
    }
  },
  favoriteArticle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("POST /api/articles/:slug/favorite");
    } catch (err) {
      next(err);
    }
  },
  unfavoriteArticle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("DELETE /api/articles/:slug/favorite");
    } catch (err) {
      next(err);
    }
  },
};
