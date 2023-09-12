import mongoose from 'mongoose';
import IBook from './book.interface';
import IUser from './user.interface';

export default interface IReqBodyUserBook {
  user: IUser & mongoose.Document;
  books: {
    availableBooks: IBook[] & mongoose.Document[];
    unavailableBooks: IBook[] & mongoose.Document[];
  };
}
