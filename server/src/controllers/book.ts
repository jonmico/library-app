import { NextFunction, Request, Response } from 'express';

import Book from '../models/book';

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

// TODO: Implement delete book controller. (?)

// TODO: Implement edit book controller. (?)

// TODO: Implement get book controller (like by ID).

// TODO: Implement search controller. Title, author, keywords, etc.
