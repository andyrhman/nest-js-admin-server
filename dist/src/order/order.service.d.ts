import { AbstractService } from 'src/common/abstract.service';
import { Order } from './models/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './models/order-item.entity';
export declare class OrderService extends AbstractService {
    private readonly orderRepository;
    private readonly orderItemRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>);
    seed(): Promise<void>;
}
