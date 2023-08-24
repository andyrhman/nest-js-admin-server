import { OnModuleInit } from '@nestjs/common';
import { OrderService } from './order.service';
export declare class OrderModule implements OnModuleInit {
    private readonly orderService;
    constructor(orderService: OrderService);
    onModuleInit(): Promise<void>;
}
