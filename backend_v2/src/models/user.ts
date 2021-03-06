import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  ts3Uid: string;
  loginKey: string;
}

const UserSchema = new Schema(
  {
    ts3Uid: { type: String, required: true, unique: true },
    loginKey: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
