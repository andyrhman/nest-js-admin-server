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

    // async findOne(options, relations = []) {
    //     // Add 'order_items.product' to the relations array
    //     relations.push('order_items.product');
    //     return this.repository.findOne({ where: options, relations });
    // }    

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
            TO_CHAR(o.created_at, 'YYYY-MM-DD') as date,
            REPLACE(TO_CHAR(TRUNC(sum(i.price * i.quantity)), 'FM999G999G999'), ',', '') as sum
            FROM orders o
            JOIN order_items i on o.id = i.order_id
            GROUP BY TO_CHAR(o.created_at, 'YYYY-MM-DD')
            ORDER BY TO_CHAR(o.created_at, 'YYYY-MM-DD') ASC;      
        `;

        const result = await this.orderRepository.query(query);
        return result;
    }

    async createOrders(data): Promise<any> {
        const order = new Order();
        order.name = data.name;
        order.email = data.email;
        order.userId = data.userId;
        await this.orderRepository.save(order);

        const orderItem = new OrderItem();
        orderItem.product_title = data.product_title;
        orderItem.price = data.price;
        orderItem.quantity = data.quantity;
        orderItem.order = order;
        orderItem.product_id = data.product_id;
        await this.orderItemRepository.save(orderItem);
    }

    async createOrderItem(data): Promise<any> {
        const orderItem = new OrderItem();
        orderItem.product_title = data.product_title;
        orderItem.price = data.price;
        orderItem.quantity = data.quantity;
        orderItem.order = data.order;
        orderItem.product_id = data.product_id;
        await this.orderItemRepository.save(orderItem);
    }

    async updateStatus(id: number, data): Promise<any> {
        return this.orderItemRepository.update(id, data);
    }

    // Find all user in the DB.
    async allOrderItem(relations = []): Promise<any[]> {
        return await this.orderItemRepository.find({ relations });
    }

    async findOneOrderItem(options, relations = []) {
        return this.orderItemRepository.findOne({ where: options, relations });
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

    // https://www.phind.com/search?cache=wdvxsmhkrcrqiw58fftdzj28
    // async createOrderItem(data): Promise<any> {
    //     const order = new Order();
    //     order.name = data.name;
    //     order.email = data.email;
    //     await this.orderRepository.save(order);

    //     for (const productData of data.products) {
    //         const orderItem = new OrderItem();
    //         orderItem.product_title = productData.product_title;
    //         orderItem.price = productData.price;
    //         orderItem.quantity = productData.quantity;
    //         orderItem.order = order;
    //         await this.orderItemRepository.save(orderItem);
    //     }
    // }

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
