import express from 'express';

import { createBook, checkoutBooks } from '../controllers/book';
import checkUser from '../middleware/checkUser';
import checkBook from '../middleware/checkBook';

const router = express.Router();

router.post('/new', createBook);

router.put('/checkout', checkUser, checkBook, checkoutBooks);

export default router;
