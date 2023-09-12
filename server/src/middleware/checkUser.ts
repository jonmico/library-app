import { Request, Response, NextFunction } from 'express';

import User from '../models/user';
import AppError from '../errors/AppError';

export default async function checkUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req.body;

    if (!user || !user.email) {
      throw new AppError(400, 'No user in request.');
    }

    const existingUser = await User.findOne({ email: user.email }).exec();

    if (!existingUser) {
      throw new AppError(404, 'User not found.');
    }

    req.body.user = existingUser;
    next();
  } catch (err) {
    next(err);
  }
}
