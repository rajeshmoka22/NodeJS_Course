import {Router} from 'express';
import { UserController } from '../../controllers/userController';
import {userValidator, userSchema} from '../validators/userValidator';

const userRouter = Router();

userRouter.get('/', UserController.getUsers);

userRouter.get('/:id', UserController.getUser);

userRouter.post('/', userValidator(userSchema), UserController.createUser);

userRouter.post('/:id', userValidator(userSchema), UserController.updateUser);

userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;
