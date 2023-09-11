import express from 'express';

import { registerUser, validateUser } from '../controllers/user';

const router = express.Router();

router.post('/register', registerUser);

router.post('/validate', validateUser);

export default router;
