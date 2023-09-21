import mongoose from 'mongoose';

export default interface IBook {
  author: string;
  title: string;
  isCheckedOut: boolean;
  checkedOutTo: string;
  reservedTo: mongoose.Types.ObjectId[];
  isHolding: boolean;
}
