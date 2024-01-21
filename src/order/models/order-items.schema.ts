import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Order } from "./order.schema";

export interface IOrderItems {
    _id: string;
    product_title: string;
    price: number;
    quantity: number;
    order: string;
}

export type OrderItemDocument = HydratedDocument<IOrderItems>

@Schema()
export class OrderItem {
    @Prop({ type: String })
    product_title: string;

    @Prop({ type: Number })
    price: string;

    @Prop({ type: Number })
    quantity: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
    order: Order;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);