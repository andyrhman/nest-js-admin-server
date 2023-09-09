import { AbstractService } from 'src/common/abstract.service';
import { Order } from './models/order.entity';
import { OrderItem } from './models/order-item.entity';
import { Repository } from 'typeorm';
import { PaginatedResult } from 'src/common/paginated-result.interface';
export declare class OrderService extends AbstractService {
    private readonly orderRepository;
    private readonly orderItemRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>);
    paginate(page?: number, relations?: any[]): Promise<PaginatedResult>;
    chart(): Promise<any[]>;
    createOrderItem(data: any): Promise<any>;
    findOrder(search: string, page?: number): Promise<any>;
}
