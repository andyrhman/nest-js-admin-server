import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { OrderDocument } from './models/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService extends AbstractService<OrderDocument>{
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<OrderDocument>
    ) {
        super(orderModel)
    }
}
