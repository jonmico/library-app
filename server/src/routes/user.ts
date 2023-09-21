import express from 'express';

import {
  checkoutBooks,
  registerUser,
  reserveBooks,
  checkInBooks,
  validateUser,
} from '../controllers/user';
import checkUser from '../middleware/checkUser';
import checkBooks from '../middleware/checkBooks';

const router = express.Router();

router.post('/register', registerUser);

router.post('/validate', validateUser);

router.put('/checkout', checkUser, checkBooks, checkoutBooks);

router.put('/reserve', checkUser, checkBooks, reserveBooks);

router.put('/checkin', checkUser, checkInBooks);

export default router;
