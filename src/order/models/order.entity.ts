import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";
import { Expose } from "class-transformer";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: string;

    // Order (one) to orders_item (many) relationship
    // That means One order has many order_items
    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    order_items: OrderItem[];

    // Getting the total price
    @Expose()
    get total(): number {
        return this.order_items.reduce((sum, i) => sum + i.quantity * i.price, 0);
    }

}