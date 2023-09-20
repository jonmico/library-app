import mongoose from 'mongoose';

export default interface IUser {
  email: string;
  checkedOutBooks: mongoose.Schema.Types.ObjectId[];
  reservedBooks: mongoose.Schema.Types.ObjectId[];
  pendingBooks: mongoose.Schema.Types.ObjectId[];
}
