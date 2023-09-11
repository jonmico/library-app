import mongoose from 'mongoose';
import IUser from '../types/user.interface';

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

export default User;
