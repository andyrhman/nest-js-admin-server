import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Product } from './models/product.entity';

@Injectable()
export class ProductService extends AbstractService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ) {
        super(productRepository)
    }

    async findProducts(search: string, page = 1): Promise<any> {
        const take = 1;

        const [products, total] = await this.productRepository
            .createQueryBuilder('product')
            .where('product.title ILIKE :search OR product.description ILIKE :search', { search: `%${search}%` })
            .skip((page - 1) * take)
            .take(take)
            .getManyAndCount();

        return {
            data: products,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    }
}
