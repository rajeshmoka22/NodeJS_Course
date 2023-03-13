import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../../config/env';

export function jwtValidator(req: Request, res: Response, next: NextFunction): void {
  if (req.path === '/login') {
    return next();
  }
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send('Unauthorized');
  } else {
    jwt.verify(token, env.jwt.secret as string, (err) => {
      if (err) {
        res.status(403).send(`Forbidden - ${err.message}`);
      }
      else next();
    });
  }
}
