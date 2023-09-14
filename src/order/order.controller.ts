import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, Put, Query, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { Order } from './models/order.entity';
import { OrderItem } from './models/order-item.entity';
import { OrderItemStatus } from './models/order-item.entity';
import { HasPermission } from 'src/permission/decorator/permission.decorator';

@UseInterceptors(ClassSerializerInterceptor) // hide the password
@UseGuards(AuthGuard)
@Controller()
export class OrderController {
    constructor(
        private orderService: OrderService
    ) { }

    // * Get all orders
    @Get('orders')
    @HasPermission('orders')
    async all(@Query('page') page = 1) {
        // return this.orderService.all(['order_items'])
        return this.orderService.paginate(page, ['order_items']);
    }

    // * Get all order Item
    @Get('order-item')
    @HasPermission('orders')
    async allOrderItem() {
        return this.orderService.allOrderItem();
    }

    // * update orders
    @Put('/orders/:id')
    async status(
        @Param() id: number,
        @Body() body: any
    ) {
        if (body.status && !Object.values(OrderItemStatus).includes(body.status)) {
            throw new BadRequestException('Invalid status');
        }
        // if (body.status && !(body.status in OrderItemStatus)) {
        //     throw new BadRequestException('Invalid status');
        // }

        await this.orderService.updateStatus(id, {
            status: body.status
        });

        return {
            message: "Updated successfully"
        };
    }

    // * Get order item
    @Get('/orders/:id')
    async get(@Param('id') id: number) {
        return this.orderService.findOneOrderItem({ id });
    }


    @Get('order')
    async findUsers(@Query('search') search: string, @Query('page') page: number = 1): Promise<Order[]> {
        // Check for malicious characters in the search input
        if (/[<>]/.test(search)) {
            throw new BadRequestException("Invalid user input");
        }

        const orders = await this.orderService.findOrder(search, page);

        if (orders.length === 0) {
            throw new NotFoundException(`Can't find any results for your search: ${search}`);
        }

        return orders;
    }

    // Export csv
    @Post('export')
    @HasPermission('orders')
    async export(
        @Res() res: Response
    ) {
        const parser = new Parser({
            fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
        });

        const orders = await this.orderService.all(['order_items']);

        const json = [];

        orders.forEach((o: Order) => {
            o.order_items.forEach((i: OrderItem) => {
                json.push({
                    ID: o.id,
                    Name: o.name,
                    Email: o.email,
                    'Product Title': i.product_title,
                    Price: i.price,
                    Quantity: i.quantity
                });
            });
        });

        const csv = parser.parse(json);

        res.header('Content-Type', 'text/csv');
        res.attachment('orders.csv');
        res.send(csv);
    }

    @Get('chart')
    @HasPermission('orders')
    async orders() {
        return this.orderService.chart();
    }
}
