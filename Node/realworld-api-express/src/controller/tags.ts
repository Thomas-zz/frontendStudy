import { Request, Response, NextFunction } from "express";

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try{
      res.send('GET /api/tags')
    }catch(err){
      next(err)
    }
  }
};
