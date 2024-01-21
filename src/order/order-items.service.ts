import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderItemDocument } from './models/order-items.schema';

@Injectable()
export class OrderItemService extends AbstractService<OrderItemDocument>{
    constructor(
        @InjectModel('OrderItem') private readonly orderItemModel: Model<OrderItemDocument>
    ) {
        super(orderItemModel)
    }
}
