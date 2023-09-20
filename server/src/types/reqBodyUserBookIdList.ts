import mongoose from 'mongoose';
import IUser from './user.interface';

export default interface IReqBodyUserBookIdList {
  user: IUser & mongoose.Document;
  bookIds: mongoose.Schema.Types.ObjectId[];
}
