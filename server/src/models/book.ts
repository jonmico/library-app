import mongoose from 'mongoose';
import IBook from '../types/book.interface';
import IBookCopy from '../types/bookCopy.interface';

// const bookCopySchema = new mongoose.Schema<IBookCopy>({
//   isCheckedOut: { type: Boolean, default: false },
// });

const bookSchema = new mongoose.Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isCheckedOut: { type: Boolean, required: true },
  // copies: [bookCopySchema],
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
