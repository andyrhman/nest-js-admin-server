import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface IPermission {
  _id: string;
  name: string;
}

export type PermissionDocument = HydratedDocument<IPermission>;

@Schema()
export class Permission {
  @Prop({ required: true })
  name: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);

// import * as mongoose from 'mongoose';
// import { Document } from 'mongoose';

// export interface IPermission extends Document {
//   _id: string;
//   name: string;
// }

// export const Permission = new mongoose.Schema({
//   name: { type: String, required: true }
// });