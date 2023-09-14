import { OrderService } from './order.service';
import { Response } from 'express';
import { Order } from './models/order.entity';
import { OrderItem } from './models/order-item.entity';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    all(page?: number): Promise<import("../common/paginated-result.interface").PaginatedResult>;
    allOrderItem(): Promise<any[]>;
    status(id: number, body: any): Promise<{
        message: string;
    }>;
    get(id: number): Promise<OrderItem>;
    findUsers(search: string, page?: number): Promise<Order[]>;
    export(res: Response): Promise<void>;
    orders(): Promise<any[]>;
}
