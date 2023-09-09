import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Order } from './models/order.entity';
import { OrderItem } from './models/order-item.entity';
import { Repository } from 'typeorm';
import { PaginatedResult } from 'src/common/paginated-result.interface';

@Injectable()
export class OrderService extends AbstractService {
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>,
    ) {
        super(orderRepository);
    }

    async paginate(page = 1, relations = []): Promise<PaginatedResult> {
        const { data, meta } = await super.paginate(page, relations);

        return {
            // Hiding the password, don't use if you already used Interceptor.
            data: data.map((order: Order) => ({
                id: order.id,
                name: order.name,
                email: order.email,
                total: order.total,
                created_at: order.created_at,
                order_items: order.order_items
            })),
            meta
        }
    }

    // The chart Service
    async chart(): Promise<any[]> {
        const query = `
            SELECT
            TO_CHAR(o.created_at, 'YYYY-MM-DD') as data,
            TO_CHAR(sum(i.price * i.quantity), 'FM999,999,999') as sum
            FROM orders o
            JOIN order_items i on o.id = i.order_id
            GROUP BY TO_CHAR(o.created_at, 'YYYY-MM-DD');
        `;

        const result = await this.orderRepository.query(query);
        return result;
    }

    // https://www.phind.com/search?cache=wdvxsmhkrcrqiw58fftdzj28
    async createOrderItem(data): Promise<any> {
        const order = new Order();
        order.name = data.name;
        order.email = data.email;
        await this.orderRepository.save(order);

        for (const productData of data.products) {
            const orderItem = new OrderItem();
            orderItem.product_title = productData.product_title;
            orderItem.price = productData.price;
            orderItem.quantity = productData.quantity;
            orderItem.order = order;
            await this.orderItemRepository.save(orderItem);
        }
    }

    async findOrder(search: string, page = 1): Promise<any> {
        const take = 1;

        const [orders, total] = await this.orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.order_items', 'order_items') // Join the role table and alias it as 'role'
            .where('order.name ILIKE :search OR order.email ILIKE :search OR order_items.product_title ILIKE :search', { search: `%${search}%` })
            .skip((page - 1) * take)
            .take(take)
            .getManyAndCount();

        return {
            data: orders,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    }

    // async createOrderItem(data): Promise<OrderItem> {
    //     return this.orderItemRepository.save(data);
    // }
    // async seed() {
    //     const order = new Order();
    //     order.name = 'John Doe';
    //     order.email = 'john@example.com';
    //     await this.orderRepository.save(order);

    //     const orderItem1 = new OrderItem();
    //     orderItem1.product_title = 'Product 1';
    //     orderItem1.price = 100;
    //     orderItem1.quantity = 2;
    //     orderItem1.order = order;
    //     await this.orderItemRepository.save(orderItem1);

    //     const orderItem2 = new OrderItem();
    //     orderItem2.product_title = 'Product 2';
    //     orderItem2.price = 100;
    //     orderItem2.quantity = 3;
    //     orderItem2.order = order;
    //     await this.orderItemRepository.save(orderItem2);

    //     // Add more data as needed
    // }
}
