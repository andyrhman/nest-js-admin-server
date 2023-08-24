import { OrderService } from './order.service';
import { Response } from 'express';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    all(page?: number): Promise<import("../common/paginated-result.interface").PaginatedResult>;
    export(res: Response): Promise<void>;
}