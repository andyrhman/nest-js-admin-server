import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export interface IPermission extends Document {
    _id: string;
    name: string;
}
export declare const Permission: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
}>> & mongoose.FlatRecord<{
    name: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
