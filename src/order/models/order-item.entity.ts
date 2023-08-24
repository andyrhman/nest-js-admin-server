import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_title: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    // order_items (Many) to order (one) relationship
    // That means Many order_items has One Order
    @ManyToOne(() => Order, order => order.order_items)
    @JoinColumn({ name: 'order_id' })
    order: Order

}