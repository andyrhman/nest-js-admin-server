import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export interface IProduct {
    _id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    quantiy: number;
    created_at: string;
    updated_at: string;
}

export type ProductDocument = HydratedDocument<IProduct>;

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})
export class Product {
    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: String })
    image: string;

    @Prop({ type: Number})
    price: number
}

export const ProductSchema = SchemaFactory.createForClass(Product);