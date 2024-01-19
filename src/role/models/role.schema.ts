import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';
import { PermissionDocument, Permission } from 'src/permission/models/permission.schema';
import mongoose from 'mongoose';

export interface IRole {
  _id: string;
  name: string;
  permissions: PermissionDocument[];
}
export type RoleDocument = HydratedDocument<IRole>;
@Schema()
export class Role {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] })
  permissions: Permission[]; // Change to Types.ObjectId[]
}

export const RoleSchema = SchemaFactory.createForClass(Role);

// import * as mongoose from 'mongoose';
// import { IPermission } from 'src/permission/models/permission.schema';

// export interface IRole extends Document {
//   _id: string;
//   name: string;
//   permissions: IPermission[]; 
// }

// export const RoleSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
// });

// export const Role = mongoose.model<IRole>('Role', RoleSchema);