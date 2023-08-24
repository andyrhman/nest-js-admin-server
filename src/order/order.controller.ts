import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
    constructor(
        private orderService: OrderService
    ) {}

    // Get all orders
    @Get()
    async all(@Query('page') page = 1){
        return this.orderService.paginate(page, ['order_items'])
    }

}
