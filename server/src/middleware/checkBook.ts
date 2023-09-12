import { Request, Response, NextFunction } from 'express';

import Book from '../models/book';
import AppError from '../errors/AppError';
import IBook from '../types/book.interface';
import mongoose from 'mongoose';

export default async function checkBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { bookIds } = req.body;

    if (!bookIds || !bookIds.length) {
      throw new AppError(400, 'No books in request.');
    }

    const booksToCheckout = await Book.find({ _id: { $in: bookIds } }).exec();

    if (bookIds.length !== booksToCheckout.length) {
      const foundBookIds = booksToCheckout.map((book) => book._id);
      const missingBookIds = bookIds.filter(
        (bookId: mongoose.Types.ObjectId) => !foundBookIds.includes(bookId)
      );
      throw new AppError(
        404,
        `One or more books were not found: ${missingBookIds.join(', ')}`
      );
    }

    const availableBooks: IBook[] = [];
    const unavailableBooks: IBook[] = [];

    for (const book of booksToCheckout) {
      if (book.isCheckedOut) {
        unavailableBooks.push(book);
      } else {
        availableBooks.push(book);
      }
    }

    if (!availableBooks.length) {
      throw new AppError(400, 'None of the selected books are available.');
    }

    req.body.books = {
      availableBooks,
      unavailableBooks,
    };

    next();
  } catch (err) {
    next(err);
  }
}
