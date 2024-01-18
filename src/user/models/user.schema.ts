// user.schema.ts
import * as mongoose from 'mongoose';
import { IRole } from 'src/role/models/role.schema';

export interface IUser extends Document {
  toObject(): any;
  fullName: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  role?: IRole;
}

export const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
});


UserSchema.pre('save', function (next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  if (this.isModified('username')) {
    this.username = this.username.toLowerCase();
  }
  next();
});