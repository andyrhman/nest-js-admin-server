import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export interface IOrder {
    name: string;
    email: string;
    created_at: Date;
}

export type OrderDocument = HydratedDocument<IOrder>

@Schema()
export class Order {
    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    email: string;

    @Prop({ type: Date, default: Date.now })
    created_at: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);