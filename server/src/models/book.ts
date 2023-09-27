import mongoose, { Types } from 'mongoose';
import IBook from '../types/book.interface';

const bookSchema = new mongoose.Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isCheckedOut: { type: Boolean, default: false },
  checkedOutTo: { type: String, default: '' },
  reservedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isHolding: { type: Boolean, default: false },
  heldTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
