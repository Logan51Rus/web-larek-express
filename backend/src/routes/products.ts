import { Router } from 'express';
import { getProducts, addProduct } from '../controllers/products';
import { validateProductBody } from '../middlewares/validation';

const router = Router();
router.get('/product', getProducts);
router.post('/product', validateProductBody, addProduct);

export default router;
