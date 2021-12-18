import { Request, Response, NextFunction } from "express";

export default {
  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    try{
      res.send('GET /api/profiles/:username')
    }catch(err){
      next(err)
    }
  },
  followUser: async (req: Request, res: Response, next: NextFunction) => {
    try{
      res.send('POST /api/profiles/:username/follow')
    }catch(err){
      next(err)
    }
  },
  unfollowUser: async (req: Request, res: Response, next: NextFunction) => {
    try{
      res.send('DELETE /api/profiles/:username/follow')
    }catch(err){
      next(err)
    }
  },
};
