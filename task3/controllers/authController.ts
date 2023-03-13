import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ControllerLogger } from '../api/middleware/controllerLogger';
import { env } from '../config/env';
import { AuthService } from '../services/authService';

export class AuthController {
  @ControllerLogger()
  public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { login, password } = req.body;

    try {
      const user = await AuthService.getUser(login, password);

      if (!user) {
        res.status(400).send('incorrect username or password.');
      } else {
        jwt.sign({ login, password }, env.jwt.secret as string , (err: (Error | null), token: (string | undefined)) => {
          if (err) {
            throw err;
          }
          res.status(200).send({ token });
        });
      }
    } catch (error) {
      return next(error);
    }
  }
}
