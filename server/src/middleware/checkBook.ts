import { Request, Response, NextFunction } from 'express';

import Book from '../models/book';
import AppError from '../errors/AppError';

export default async function checkBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { bookId } = req.body;

    const existingBook = await Book.findById(bookId).exec();

    if (!existingBook) {
      throw new AppError(404, 'Book not found.');
    }

    if (existingBook.isCheckedOut) {
      throw new AppError(403, 'Book is already checked out.');
    }

    req.body.book = existingBook;

    next();
  } catch (err) {
    next(err);
  }
}
