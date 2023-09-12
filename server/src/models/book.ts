import mongoose from 'mongoose';
import IBook from '../types/book.interface';

const bookSchema = new mongoose.Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isCheckedOut: { type: Boolean, required: true },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
