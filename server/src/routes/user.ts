import express from 'express';

import {
  checkoutBooks,
  registerUser,
  reserveBooks,
  validateUser,
} from '../controllers/user';
import checkUser from '../middleware/checkUser';

const router = express.Router();

router.post('/register', registerUser);

router.post('/validate', validateUser);

router.put('/checkout', checkUser, checkoutBooks);

router.put('/reserve', checkUser, reserveBooks);

export default router;
