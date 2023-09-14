import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import AppError from '../errors/AppError';
import Book from '../models/book';

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new AppError(409, 'A user with this email already exists.');
    }

    const newUser = await User.create({ email });

    res.status(201).json({ user: newUser });
  } catch (err) {
    next(err);
  }
}

export async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw new AppError(403, 'This email is not registered with the server.');
    }

    res.json({ message: 'Email is registered.', user });
  } catch (err) {
    next(err);
  }
}

export async function reserveBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user, reserveList } = req.body;

    if (!reserveList || !reserveList.length) {
      throw new AppError(400, 'There were no book IDs to search for.');
    }

    const booksToReserve = await Book.find({
      _id: { $in: reserveList },
      isCheckedOut: { $eq: true },
    }).exec();

    if (!booksToReserve.length) {
      throw new AppError(404, 'No books were found.');
    }

    const filterReserves = booksToReserve.filter(
      (book) => !user.checkedOutBooks.includes(book._id)
    );

    if (!filterReserves.length) {
      throw new AppError(
        400,
        'All of the requested books were already checked out to the user.'
      );
    }

    for (const book of filterReserves) {
      user.reservedBooks.push(book._id);
    }

    user.save();

    if (filterReserves.length !== booksToReserve.length) {
      const missingBooks = booksToReserve.filter(
        (book) => !filterReserves.includes(book)
      );

      res.json({
        user,
        reservedBooks: filterReserves,
        unsuccessful: { reason: 'Already checked out.', missingBooks },
      });
    }

    res.json({
      user,
      booksToReserve,
      length: booksToReserve.length,
      filterReserves,
    });
  } catch (err) {
    next(err);
  }
}
