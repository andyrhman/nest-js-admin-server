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

    async find(): Promise<OrderDocument[]> {
        return this.orderModel.find().populate('order_items').exec();
    }

    // ? https://www.phind.com/search?cache=mv6yem0x5g3qjouegt6g1at2
    async chart(): Promise<any[]> {
        const ordersWithItems = await this.orderModel.aggregate([
            {
                $lookup: {
                    from: 'orderitems', // This should match your OrderItem collection name in MongoDB
                    localField: 'order_items',
                    foreignField: '_id',
                    as: 'items'
                }
            },
            {
                $unwind: '$items'
            },
            {
                $group: {
                    _id: {
                        date: {
                            $dateToString: { format: "%Y-%m-%d", date: "$created_at" }
                        }
                    },
                    sum: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: '$_id.date',
                    sum: 1
                }
            },
            {
                $sort: { date: 1 }
            }
        ]);

        // Convert the sum to a string without commas if needed
        // If your business logic requires the sum to be a string without commas, map through the results
        // ordersWithItems.map(item => {
        //     item.sum = item.sum.toString().replace(/,/g, '');
        //     return item;
        // });

        return ordersWithItems;
    }
}
