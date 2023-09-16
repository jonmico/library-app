import mongoose from 'mongoose';
import IUser from './user.interface';

export default interface IReqBodyUserReserveList {
  user: IUser;
  reserveList: mongoose.Schema.Types.ObjectId;
}
