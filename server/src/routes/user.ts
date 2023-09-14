import express from 'express';

import { registerUser, reserveBooks, validateUser } from '../controllers/user';

const router = express.Router();

router.post('/register', registerUser);

router.post('/validate', validateUser);

router.put('/reserve', reserveBooks);

export default router;
