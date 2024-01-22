import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { OrderItem, OrderItemDocument } from "./order-items.schema";

export interface IOrder {
    _id: string;
    name: string;
    email: string;
    created_at: Date;
    order_items: OrderItemDocument[]
}

export type OrderDocument = HydratedDocument<IOrder>

@Schema({
    virtuals: {
        total: {
            get(): number {
                return this.order_items.reduce((sum, item) => sum + item.quantity * item.price, 0);
            }
        }
    },
    toJSON: { virtuals: true }
})
export class Order {
    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    email: string;

    @Prop({ type: Date, default: Date.now })
    created_at: Date;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }] })
    order_items: OrderItem[]
}

export const OrderSchema = SchemaFactory.createForClass(Order);