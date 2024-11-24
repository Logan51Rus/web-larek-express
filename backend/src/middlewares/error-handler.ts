import {
  ErrorRequestHandler, NextFunction, Request, Response,
} from 'express';

interface customError extends Error {
  statusCode?: number
}

// eslint-disable-next-line max-len
const errorHandler: ErrorRequestHandler = (err: customError, _: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

export default errorHandler;
