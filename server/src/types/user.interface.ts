import mongoose from 'mongoose';

export default interface IUser {
  email: string;
  checkedOutBooks: mongoose.Types.ObjectId[];
  reservedBooks: mongoose.Types.ObjectId[];
  holdingBooks: mongoose.Types.ObjectId[];
}
