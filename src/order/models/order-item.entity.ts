import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/product/models/product.entity";

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

    @Column({name: "product_id"})
    product_id: string;

    // order_items (Many) to order (one) relationship
    // That means Many order_items has One Order
    @ManyToOne(() => Order, order => order.order_items)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Product, product => product.order_items)
    @JoinColumn({ name: 'product_id' })
    product: Product;

}