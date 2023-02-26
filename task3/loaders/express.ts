import express from 'express';
import cors from 'cors';
import { exceptionHandler } from '../api/handlers/errorHandler';
import { apiLogger } from '../api/middleware/apiLogger';
import { jwtValidator } from '../api/middleware/jwtValidator';
import authRouter from '../api/routes/authRouter';
import groupRouter from '../api/routes/groupRoutes';
import userRouter from '../api/routes/userRoutes';

const corsOptions = {
  origin: 'http://localhost:3000', //enabling localhost for testing
  optionsSuccessStatus: 200
} 
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(apiLogger);
app.use(jwtValidator);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/', authRouter);
app.use(exceptionHandler);

export default app;
