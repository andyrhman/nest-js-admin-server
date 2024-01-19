import mongoose, { HydratedDocument } from 'mongoose';
import { Role, RoleDocument } from 'src/role/models/role.schema';
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
export declare class User {
    fullName: string;
    username: string;
    email: string;
    password: string;
    role: Role;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
}>;
