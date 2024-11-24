import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const {
    items,
  } = req.body;

  try {
    const allProducts = await Product.find({ _id: { $in: items } });

    const invalidProduct = allProducts.find((product) => product.price === null);
    if (invalidProduct) {
      return next(new BadRequestError(`Товар с id ${invalidProduct._id} недоступен для продажи`));
    }

    const totalPrice = allProducts.reduce((acc, product) => acc + (product.price || 0), 0);

    const orderId = faker.string.uuid();

    return res.status(201).send({
      id: orderId,
      total: totalPrice,
    });
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError('Переданы некорректные данные при создании заказа'));
    }

    return next(new Error('Произошла ошибка при создании заказа'));
  }
};

export default createOrder;
