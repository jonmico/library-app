import { NextFunction, Request, Response } from 'express';

import Book from '../models/book';
import IReqBodyUserBook from '../types/reqbodyuserbook.interface';
import AppError from '../errors/AppError';

export async function createBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { book } = req.body;
    const newBook = await Book.create(book);

    res.status(201).json({ book: newBook });
  } catch (err) {
    next(err);
  }
}

// FIXME: Fix duplicate checkouts.
export async function checkoutBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user, books }: IReqBodyUserBook = req.body;

    const checkedOutBooks = await Book.updateMany(
      { _id: { $in: books.availableBooks } },
      {
        isCheckedOut: true,
      }
    ).exec();

    if (checkedOutBooks.modifiedCount !== books.availableBooks.length) {
      throw new AppError(
        409,
        'Concurrency issue: Some books were already checked out.'
      );
    }

    for (const book of books.availableBooks) {
      user.checkedOutBooks.push(book._id);
    }

    await user.save();

    res.status(201).json({ user, checkedOutBooks });
  } catch (err) {
    next(err);
  }
}
