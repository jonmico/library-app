import { NextFunction, Request, Response } from 'express';

import Book from '../models/book';
import User from '../models/user';
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

export async function checkoutBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user, bookId } = req.body;

    const existingUser = await User.findOne({ email: user.email }).exec();

    if (!existingUser) {
      throw new AppError(404, 'User not found.');
    }

    const existingBook = await Book.findById(bookId);

    if (!existingBook) {
      throw new AppError(404, 'Book not found.');
    }

    if (existingBook.isCheckedOut) {
      throw new AppError(403, 'Book is already checked out.');
    }

    existingBook.isCheckedOut = true;
    await existingBook.save();

    existingUser.checkedOutBooks.push(existingBook._id);
    await existingUser.save();

    res.json({ user: existingUser, book: existingBook });
  } catch (err) {
    next(err);
  }
}
