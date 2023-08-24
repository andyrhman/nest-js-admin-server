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

      @Expose()
  get total(): number {
    let total = 0;
    for (const item of this.order_items) {
      total += item.quantity * item.price;
    }
    return total;
  }

    // Getting the total price with decimal
    // @Expose()
    // get total(): string {
    //     let total = 0;
    //     for (const item of this.order_items) {
    //         total += item.quantity * item.price;
    //     }
    //     return total.toLocaleString(undefined, {
    //         minimumFractionDigits: 2,
    //         maximumFractionDigits: 2,
    //     });
    // }

}