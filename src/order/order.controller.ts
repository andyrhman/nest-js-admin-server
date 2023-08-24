import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { Order } from './models/order.entity';
import { OrderItem } from './models/order-item.entity';

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
        return this.orderService.paginate(page, ['order_items']);
    }

    // Export csv
    @Post('export')
    async export(
        @Res() res: Response
    ){
        const parser = new Parser({
            fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
        });

        const orders = await this.orderService.all(['order_items']);

        const json = [];   

        orders.forEach((o: Order) => {
            json.push({
                ID: o.id,
                Name: o.name,
                Email: o.email,
                'Product Title': '',
                Price: '',
                Quantity: ''
            });

            o.order_items.forEach((i: OrderItem) => {
                json.push({
                    ID: '',
                    Name: '',
                    Email: '',
                    'Product Title': i.product_title,
                    Price: i.price,
                    Quantity: i.quantity
                });
            })
        });

        const csv = parser.parse(json);

        res.header('Content-Type', 'text/csv');
        res.attachment('orders.csv');
        res.send(csv);
        // here's the alternative
        // https://chat.openai.com/share/04b5c77d-ae0d-4e2f-9da7-51f5495c883d
    }
}
