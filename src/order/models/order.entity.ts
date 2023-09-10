import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { Expose } from "class-transformer";
import { User } from "src/user/models/user.entity";

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

    @Column({ name: 'user_id' })  // Explicit column for the foreign key
    userId: string;  

    // Order (one) to orders_item (many) relationship
    // That means One order has many order_items
    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    order_items: OrderItem[];

    @OneToOne(() => User)
    @JoinColumn({name: "user_id"})
    user: User;

    // Getting the total price
    @Expose()
    get total(): number {
        return this.order_items.reduce((sum, i) => sum + i.quantity * i.price, 0);
    }

}