import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './models/order.schema';
import { OrderItemSchema } from './models/order-items.schema';
import { OrderItemService } from './order-items.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'OrderItem', schema: OrderItemSchema },
    ])
  ],
  providers: [OrderService, OrderItemService],
  controllers: [OrderController]
})
export class OrderModule { }
