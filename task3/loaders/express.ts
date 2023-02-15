import express from 'express';
import { exceptionHandler } from '../api/handlers/errorHandler';
import { apiLogger } from '../api/middleware/apiLogger';
import groupRouter from '../api/routes/groupRoutes';
import userRouter from '../api/routes/userRoutes';

const app = express();
app.use(express.json());
app.use(apiLogger);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use(exceptionHandler);

export default app;
