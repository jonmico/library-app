import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import AppError from '../errors/AppError';
import Book from '../models/book';
import IReqBodyUserBookIdList from '../types/reqBodyUserBookIdList';

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

export async function checkoutBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user, bookIds }: IReqBodyUserBookIdList = req.body;

    const booksToCheckout = await Book.find({
      _id: { $in: bookIds },
      isCheckedOut: { $eq: false },
    });

    if (!booksToCheckout.length) {
      throw new AppError(
        404,
        'The books you requested are not available or not in our collection.'
      );
    }

    await Book.updateMany(
      { _id: { $in: booksToCheckout } },
      { isCheckedOut: true, checkedOutTo: user.email }
    ).exec();

    for (const book of booksToCheckout) {
      user.checkedOutBooks.push(book._id);
    }

    user.save();

    res.json({ user });
  } catch (err) {
    next(err);
  }
}

// TODO: Look over this and see what we want to do with error handling.
export async function reserveBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user, bookIds }: IReqBodyUserBookIdList = req.body;

    const booksToReserve = await Book.find({
      _id: { $in: bookIds },
      isCheckedOut: { $eq: true },
    }).exec();

    if (!booksToReserve.length) {
      throw new AppError(404, 'No books were found.');
    }

    const filterReserves = booksToReserve.filter(
      (book) =>
        !user.checkedOutBooks.includes(book._id) &&
        !user.reservedBooks.includes(book._id)
    );

    if (!filterReserves.length) {
      // Filter for checked out books.
      const checkedOut = booksToReserve.filter((book) =>
        user.checkedOutBooks.includes(book._id)
      );

      // Filter for reserved books.
      const reserved = booksToReserve.filter((book) =>
        user.reservedBooks.includes(book._id)
      );

      // Map over both of the filtered arrays to get an array
      // of only book titles.
      const checkedOutTitles = checkedOut.map((book) => book.title);
      const reservedTitles = reserved.map((book) => book.title);

      // Throw an AppError that shows which books were checked out
      // and which books were reserved.
      throw new AppError(
        400,
        `All of the requested books were either already reserved or checked out to the user. Books already checked out: ${checkedOutTitles.join(
          ', '
        )}; Books already reserved: ${reservedTitles.join(', ')}.`
      );
    }

    for (const book of filterReserves) {
      user.reservedBooks.push(book._id);
    }

    user.save();

    const filterReservesTitles = filterReserves.map(
      (book) => `${book.title} (${book._id})`
    );

    res.json({
      reservedBooks: filterReservesTitles,
    });
  } catch (err) {
    next(err);
  }
}

export async function checkInBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user, bookIds } = req.body;

    if (!bookIds || !bookIds.length) {
      throw new AppError(400, 'No books were provided.');
    }

    // Remove potential duplicate bookIds in request.
    const uniqueBookIds = [...new Set(bookIds)];

    const books = await Book.find({
      _id: { $in: uniqueBookIds },
      isCheckedOut: { $eq: true },
      checkedOutTo: { $eq: user.email },
    }).exec();

    if (!books.length) {
      throw new AppError(404, 'No books were found.');
    }

    await Book.updateMany(
      {
        _id: { $in: uniqueBookIds },
      },
      { isCheckedOut: false, checkedOutTo: '' }
    ).exec();

    res.json({ user });
  } catch (err) {
    next(err);
  }
}

// TODO: Implement delete user controller.

// TODO: Implement edit user controller.

// TODO: Implement get user controller (like by ID or email, maybe both).
