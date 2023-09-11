import IBookCopy from './bookCopy.interface';

export default interface IBook {
  author: string;
  title: string;
  // copies: IBookCopy[];
  isCheckedOut: boolean;
}
