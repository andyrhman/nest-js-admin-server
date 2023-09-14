import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

export enum OrderItemStatus {
    SedangDikemas = 'Sedang Dikemas',
    Dikirim = 'Dikirim',
    Selesai = 'Selesai',
}

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

    @Column({
        type: 'enum',
        enum: OrderItemStatus,
        default: OrderItemStatus.SedangDikemas, // You can set a default value if needed
    })
    status: OrderItemStatus;

    // order_items (Many) to order (one) relationship
    // That means Many order_items has One Order
    @ManyToOne(() => Order, order => order.order_items)
    @JoinColumn({ name: 'order_id' })
    order: Order;

}