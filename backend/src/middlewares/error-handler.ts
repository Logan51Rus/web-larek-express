import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';

const errorHandler = (err: Error, _: Request, res: Response, _next: NextFunction) => {
  // eslint-disable-next-line max-len
  if (err instanceof BadRequestError || err instanceof ConflictError || err instanceof NotFoundError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  return res.status(500).json({ message: 'Произошла ошибка со стороны сервера' });
};

export default errorHandler;
