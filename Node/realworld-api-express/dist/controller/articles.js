"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getArticlesList: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.send("GET /api/articles");
        }
        catch (err) {
            next(err);
        }
    }),
    feedArticles: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.send("GET /api/articles/feed");
        }
        catch (err) {
            next(err);
        }
    }),
    getArticle: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.send("GET /api/articles/:slug");
        }
        catch (err) {
            next(err);
        }
    }),
    createArticle: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.send("POST /api/articles");
        }
        catch (err) {
            next(err);
        }
    }),
    updateArticle: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.send("PUT /api/articles/:slug");
        }
        catch (err) {
            next(err);
        }
    }),
    deleteArticle: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.send("DELETE /api/articles/:slug");
        }
        catch (err) {
            next(err);
        }
    }),
    addComments: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.send("POST /api/articles/:slug/comments");
        }
        catch (err) {
            next(err);
        }
    }),
    getComments: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.send("GET /api/articles/:slug/comments");
        }
        catch (err) {
            next(err);
        }
    }),
    deleteComment: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.send("DELETE /api/articles/:slug/comments/:id");
        }
        catch (err) {
            next(err);
        }
    }),
    favoriteArticle: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.send("POST /api/articles/:slug/favorite");
        }
        catch (err) {
            next(err);
        }
    }),
    unfavoriteArticle: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.send("DELETE /api/articles/:slug/favorite");
        }
        catch (err) {
            next(err);
        }
    }),
};
