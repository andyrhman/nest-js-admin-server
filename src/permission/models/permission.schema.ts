import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IPermission extends Document {
  _id: string;
  name: string;
}

export const Permission = new mongoose.Schema({
  name: { type: String, required: true }
});