import mongoose, { Document, Schema, model, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
});

const User: Model<IUser> = mongoose.models.User || model<IUser>('User', UserSchema);

export default User;
