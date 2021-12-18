"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_1 = __importDefault(require("../controller/profile"));
const router = express_1.default.Router();
// get profile
router.get('/:username', profile_1.default.getProfile);
// Follow user
router.post('/:username/follow', profile_1.default.followUser);
// unfollow user
router.delete('/:username/follow', profile_1.default.unfollowUser);
exports.default = router;
