import express from 'express';
import { exceptionHandler } from '../api/handlers/errorHandler';
import userRouter from '../api/routes/userRoutes';

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use(exceptionHandler);

export default app;
