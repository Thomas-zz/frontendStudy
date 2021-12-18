"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tags_1 = __importDefault(require("../controller/tags"));
const router = express_1.default.Router();
// Get Tags
router.get('/api/tags', tags_1.default.login);
exports.default = router;
