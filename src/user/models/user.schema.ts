// ? https://www.phind.com/search?cache=kgm7old15yxqkgw44w1796c4
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role, RoleDocument } from 'src/role/models/role.schema';
import mongoose from 'mongoose';

export interface IUser {
  toObject(): any;
  fullName: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  role: RoleDocument;
}

export type UserDocument = HydratedDocument<IUser>;
@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  if (this.isModified('username')) {
    this.username = this.username.toLowerCase();
  }
  next();
});


// import * as mongoose from 'mongoose';
// import { IRole } from 'src/role/models/role.schema';

// export interface IUser extends Document {
//   toObject(): any;
//   fullName: string;
//   username: string;
//   email: string;
//   password: string;
//   created_at: Date;
//   role?: IRole;
// }

// export const UserSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   created_at: { type: Date, default: Date.now },
//   role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
// });


// UserSchema.pre('save', function (next) {
//   if (this.isModified('email')) {
//     this.email = this.email.toLowerCase();
//   }
//   if (this.isModified('username')) {
//     this.username = this.username.toLowerCase();
//   }
//   next();
// });

// export const User = mongoose.model<IUser>('User', UserSchema);