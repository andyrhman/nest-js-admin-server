import mongoose, { HydratedDocument } from 'mongoose';
import { PermissionDocument, Permission } from 'src/permission/models/permission.schema';
export interface IRole {
    _id: string;
    name: string;
    permissions: PermissionDocument[];
}
export type RoleDocument = HydratedDocument<IRole>;
export declare class Role {
    name: string;
    permissions: Permission[];
}
export declare const RoleSchema: mongoose.Schema<Role, mongoose.Model<Role, any, any, any, mongoose.Document<unknown, any, Role> & Role & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Role, mongoose.Document<unknown, {}, mongoose.FlatRecord<Role>> & mongoose.FlatRecord<Role> & {
    _id: mongoose.Types.ObjectId;
}>;
