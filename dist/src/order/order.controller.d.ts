import { OrderService } from './order.service';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    all(page?: number): Promise<import("../common/paginated-result.interface").PaginatedResult>;
}
