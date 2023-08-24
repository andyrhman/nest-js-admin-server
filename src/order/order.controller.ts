import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseInterceptors(ClassSerializerInterceptor) // hide the password
@UseGuards(AuthGuard)
@Controller()
export class OrderController {
    constructor(
        private orderService: OrderService
    ) { }

    // Get all orders
    @Get('orders')
    async all(@Query('page') page = 1) {
        // return this.orderService.all(['order_items'])
        return this.orderService.paginate(page, ['order_items'])
    }

}
