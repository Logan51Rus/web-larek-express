import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';

export const getProducts = (_:Request, res: Response, next: NextFunction) => {
  Product.find({})
    .then((products) => res.send({ items: products, total: products.length }))
    .catch(() => next(new Error('Произошла ошибка при получении продуктов')));
};

export const addProduct = (req: Request, res: Response, next: NextFunction) => {
  const {
    title, image, category, description, price,
  } = req.body;
  return Product.create({
    title, image, category, description, price,
  }).then((product) => res.status(201).send({ data: product }))
    .catch((error) => {
      if (error instanceof Error && error.message.includes('E11000')) {
        return next(new ConflictError(`Товар с названием ${title} уже существует`));
      }

      if (error instanceof MongooseError.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании продукта'));
      }

      return next(new Error('Произошла ошибка при добавлении продукта'));
    });
};
