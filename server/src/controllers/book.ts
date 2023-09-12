import { NextFunction, Request, Response } from 'express';

export async function createBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json({ message: 'do this work' });
  } catch (err) {
    next(err);
  }
}
