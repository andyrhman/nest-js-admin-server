import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { IPermission } from 'src/permission/models/permission.schema';

export interface IRole extends Document {
  _id: string;
  name: string;
  permissions: IPermission[]; 
}

export const Role = new mongoose.Schema({
  name: { type: String, required: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
});