
import * as mongoose from 'mongoose';
import { IPermission } from 'src/permission/models/permission.schema';

export interface IRole extends Document {
  _id: string;
  name: string;
  permissions: IPermission[]; 
}

export const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
});

export const Role = mongoose.model<IRole>('Role', RoleSchema);

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Types, HydratedDocument } from 'mongoose';
// import { Permission, IPermission } from 'src/permission/models/permission.schema';

// export interface IRole {
//   _id: string;
//   name: string;
//   permissions: Types.ObjectId[]; // Change to Types.ObjectId[]
// }
// export type RoleDocument = HydratedDocument<IRole>;
// @Schema()
// export class Role {
//   @Prop({ required: true })
//   name: string;

//   @Prop({ type: [{ type: Types.ObjectId, ref: 'Permission' }] })
//   permissions: Types.ObjectId[]; // Change to Types.ObjectId[]
// }

// export const RoleSchema = SchemaFactory.createForClass(Role);
