import express from "express";
import profileCtrl from "../controller/profile"

const router = express.Router();

// get profile
router.get('/:username',profileCtrl.getProfile)

// Follow user
router.post('/:username/follow', profileCtrl.followUser)

// unfollow user
router.delete('/:username/follow', profileCtrl.unfollowUser)

export default router