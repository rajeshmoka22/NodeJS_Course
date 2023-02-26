import {Router} from 'express';
import { AuthController } from '../../controllers/authController';
import { loginValidator, loginSchema} from '../validators/loginValidator';

const authRouter = Router();

authRouter.get('/login', loginValidator(loginSchema), AuthController.login);

export default authRouter;
