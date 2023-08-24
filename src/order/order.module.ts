import { Module, OnModuleInit } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './models/order.entity';
import { OrderItem } from './models/order-item.entity';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Order, OrderItem])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
// export class OrderModule implements OnModuleInit {
//   constructor(private readonly orderService: OrderService) { }

//   async onModuleInit() {
//     await this.orderService.seed(); // Call the seed method
//   }
// }