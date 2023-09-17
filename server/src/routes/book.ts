import express from 'express';

import { createBook } from '../controllers/book';
import checkUser from '../middleware/checkUser';

const router = express.Router();

router.post('/new', createBook);

export default router;
