import {
    Controller,
    Get,
    NotFoundException,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { OrderService } from "./order.service";
import { AuthGuard } from "../auth/auth.guard";
import { Request, Response } from 'express';
import { Parser } from "json2csv";
import { OrderDocument } from './models/order.schema';
import { OrderItemDocument } from './models/order-items.schema';
import { HasPermission } from 'src/permission/decorator/permission.decorator';
import * as sanitizeHtml from "sanitize-html";

@UseGuards(AuthGuard)
@Controller()
export class OrderController {
    constructor(
        private orderService: OrderService
    ) { }

    @Get('orders')
    @HasPermission('orders')
    async all(
        @Req() request: Request
    ) {
        let orders = await this.orderService.find();
        let search = request.query.search;
        // * Search products

        if (typeof search === 'string') {
            search = sanitizeHtml(search);
            if (search) {
                const searchOrder = search.toString().toLowerCase();

                orders = orders.filter(order => {
                    const orderMatches = order.order_items.some(orderItem => {
                        return orderItem.product_title.toLowerCase().includes(searchOrder);
                    });
                    return (
                        order.name.toLowerCase().includes(searchOrder) ||
                        order.email.toLowerCase().includes(searchOrder) ||
                        orderMatches
                    );
                });

            }
        }

        // * Paginating products
        const page: number = parseInt(request.query.page as any) || 1;
        const perPage = 9;
        const total = orders.length;

        const data = orders.slice((page - 1) * perPage, page * perPage)

        // Check if the resulting filtered data array is empty
        if (data.length === 0) {
            // Respond with a 404 status code and a message
            throw new NotFoundException(`No ${search} matching your search criteria.`)
        }
        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / perPage)
        };
    }

    @Post('export')
    @HasPermission('orders')
    async export(@Res() res: Response) {
        const parser = new Parser({
            fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
        });

        const orders = await this.orderService.find();

        const json = [];

        orders.forEach((o: OrderDocument) => {
            o.order_items.forEach((i: OrderItemDocument) => {
                json.push({
                    ID: o.id,
                    Name: o.name,
                    Email: o.email,
                    'Product Title': i.product_title,
                    Price: i.price,
                    Quantity: i.quantity
                });
            })
        });

        const csv = parser.parse(json);
        res.header('Content-Type', 'text/csv');
        res.attachment('orders.csv');
        return res.send(csv);
    }

    @Get('chart')
    @HasPermission('orders')
    async chart() {
        return this.orderService.chart();
    }
}