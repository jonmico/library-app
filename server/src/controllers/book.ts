import { NextFunction, Request, Response } from 'express';

import Book from '../models/book';
import User from '../models/user';
import AppError from '../errors/AppError';
import IUser from '../types/user.interface';
import IBook from '../types/book.interface';
import mongoose from 'mongoose';

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

interface IReqBodyUserBook {
  user: IUser & mongoose.Document;
  book: IBook & mongoose.Document;
}

export async function checkoutBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user, book }: IReqBodyUserBook = req.body;

    book.isCheckedOut = true;
    await book.save();

    user.checkedOutBooks.push(book._id);
    await user.save();

    res.json({ user, book });
  } catch (err) {
    next(err);
  }
}
