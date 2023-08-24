import { OrderItem } from "./order-item.entity";
export declare class Order {
    id: number;
    name: string;
    email: string;
    created_at: string;
    order_items: OrderItem[];
    get total(): number;
}
