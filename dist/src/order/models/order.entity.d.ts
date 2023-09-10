import { OrderItem } from "./order-item.entity";
import { User } from "src/user/models/user.entity";
export declare class Order {
    id: number;
    name: string;
    email: string;
    created_at: string;
    userId: string;
    order_items: OrderItem[];
    user: User;
    get total(): number;
}
