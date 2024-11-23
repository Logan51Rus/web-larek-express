import { NextFunction, Request, Response } from 'express';
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
  }).then((product) => res.send({ data: product })).catch((error) => {
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError(`Товар с названием ${title} уже существует`));
    }

    return next(new Error('Произошла ошибка при создании продукта'));
  });
};
