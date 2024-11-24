import { celebrate, Joi, Segments } from 'celebrate';

const productValidationSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }),
  category: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().allow(null).optional(),
});

const orderSchema = Joi.object({
  payment: Joi.string().valid('card', 'online').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+7(\s?\(\d{3}\)\s?|\s?\d{3}\s?)\d{3}(\s?\d{2}\s?\d{2})?$/).required(),
  address: Joi.string().required(),
  total: Joi.number().required(),
  items: Joi.array().items(Joi.string()).required(),
});

const validateProductBody = celebrate({
  [Segments.BODY]: productValidationSchema,
});

const validateOrderBody = celebrate({
  [Segments.BODY]: orderSchema,
});

export { validateProductBody, validateOrderBody };
