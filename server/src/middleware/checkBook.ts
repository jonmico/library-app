import { Request, Response, NextFunction } from 'express';

import Book from '../models/book';
import AppError from '../errors/AppError';
import IBook from '../types/book.interface';

// export default async function checkBook(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { bookId } = req.body;

//     const existingBook = await Book.findById(bookId).exec();

//     if (!existingBook) {
//       throw new AppError(404, 'Book not found.');
//     }

//     if (existingBook.isCheckedOut) {
//       throw new AppError(403, 'Book is already checked out.');
//     }

//     req.body.book = existingBook;

//     next();
//   } catch (err) {
//     next(err);
//   }
// }

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
      throw new AppError(404, 'One or more books was not found.');
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
