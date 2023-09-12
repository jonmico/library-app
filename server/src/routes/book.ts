import express from 'express';

import { createBook, checkoutBook } from '../controllers/book';
import checkUser from '../middleware/checkUser';
import checkBook from '../middleware/checkBook';

const router = express.Router();

router.post('/new', createBook);

router.put('/checkout', checkUser, checkBook, checkoutBook);

export default router;
