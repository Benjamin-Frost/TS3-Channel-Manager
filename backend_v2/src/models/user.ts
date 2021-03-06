import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  id: string;
  loginKey: string;
}

const UserSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    loginKey: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
