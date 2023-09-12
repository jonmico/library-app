import express from 'express';

import { createBook, checkoutBook } from '../controllers/book';

const router = express.Router();

router.post('/new', createBook);

router.put('/checkout', checkoutBook);

export default router;
