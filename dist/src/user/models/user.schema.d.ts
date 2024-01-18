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
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    fullName: string;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    role?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    fullName: string;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    role?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    fullName: string;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    role?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
