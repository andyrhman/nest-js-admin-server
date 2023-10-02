import { OrderService } from './order.service';
import { Response } from 'express';
import { Order } from './models/order.entity';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
export declare class OrderController {
    private orderService;
    private authService;
    constructor(orderService: OrderService, authService: AuthService);
    all(page?: number): Promise<import("../common/paginated-result.interface").PaginatedResult>;
    allOrderItem(): Promise<any[]>;
    status(id: number, body: any): Promise<{
        message: string;
    }>;
    get(request: Request): Promise<any>;
    findUsers(search: string, page?: number): Promise<Order[]>;
    export(res: Response): Promise<void>;
    orders(): Promise<any[]>;
}
