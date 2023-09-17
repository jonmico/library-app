import { Request, Response, NextFunction } from 'express';
import IReqBodyUserBookIdList from '../types/reqBodyUserBookIdList';
import AppError from '../errors/AppError';

export default function checkBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { bookIds }: IReqBodyUserBookIdList = req.body;

  if (!bookIds || !bookIds.length) {
    throw new AppError(400, 'There were no book IDs to search for.');
  }
  next();
}
