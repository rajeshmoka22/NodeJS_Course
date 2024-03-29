import { Request, Response, NextFunction } from 'express';

export function exceptionHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err) {
    res.status(500).json({ message: `Internal Server Error - ${err.message}` });
  }
  next();
}
