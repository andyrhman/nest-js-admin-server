import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { IPermission } from 'src/permission/models/permission.schema';
export interface IRole extends Document {
    _id: string;
    name: string;
    permissions: IPermission[];
}
export declare const Role: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    permissions: mongoose.Types.ObjectId[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    permissions: mongoose.Types.ObjectId[];
}>> & mongoose.FlatRecord<{
    name: string;
    permissions: mongoose.Types.ObjectId[];
}> & {
    _id: mongoose.Types.ObjectId;
}>;
