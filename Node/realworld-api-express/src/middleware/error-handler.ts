import util from "util";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export default () => {
  return (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(500).json({
      error: util.format(err),
    });
  };
};
