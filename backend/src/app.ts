import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import NotFoundError from './errors/not-found-error';
import config from './config';
import productsRouter from './routes/products';
import orderRouter from './routes/order';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(config.dbAddress);

app.use(requestLogger);

app.use('/', productsRouter);
app.use('/', orderRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use((_req: Request, _res: Response, next: NextFunction) => next(new NotFoundError('Запрашиваемый ресурс не найдён')));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(config.port, () => { console.log(`server is running on port ${config.port}`); });
