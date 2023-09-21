import mongoose from 'mongoose';

export default interface IUser {
  email: string;
  checkedOutBooks: mongoose.Types.ObjectId[];
  reservedBooks: mongoose.Types.ObjectId[];
  pendingBooks: mongoose.Types.ObjectId[];
}
