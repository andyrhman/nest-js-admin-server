import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { ProductDocument } from './models/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService extends AbstractService<ProductDocument>{
    constructor(
        @InjectModel('Product') private readonly productModel: Model<ProductDocument>
    ) {
        super(productModel)
    }
}
