import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Product } from './models/product.entity';
import { ProductImages } from './models/product-images.entity';
import { ProductCreateDto } from './models/product-create.dto';
import { ProductUpdateDto } from './models/product-update.dto';

@Injectable()
export class ProductService extends AbstractService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductImages) private readonly productImagesRepository: Repository<ProductImages>

    ) {
        super(productRepository)
    }

    async findProductImages(options) {
        return this.productImagesRepository.findOne({ where: options });
    }

    async deleteImages(productId: string): Promise<any> {
        return this.productImagesRepository.delete({ productId });
    }

    async createImages(dto: ProductCreateDto): Promise<any> {
        const product = new Product();
        product.title = dto.title;
        product.description = dto.description;
        product.image = dto.image; // primary image of the product
        product.price = dto.price;
        await this.productRepository.save(product);

        for (const imageUrl of dto.images) {
            const productImage = new ProductImages();
            productImage.productId = product.id;
            productImage.image = imageUrl;
            await this.productImagesRepository.save(productImage);
        }

        return product;
    }

    async update(id: string, dto: ProductUpdateDto): Promise<any> {
        const product = new Product();
        product.title = dto.title;
        product.description = dto.description;
        product.image = dto.image; // primary image of the product
        product.price = dto.price;
        await this.productRepository.update(id, product);

        for (const imageUrl of dto.images) {
            const productImage = new ProductImages();
            productImage.productId = id;
            productImage.image = imageUrl;
            await this.productImagesRepository.save(productImage);
        }

        return product;
    }

    async findProducts(search: string, page = 1): Promise<any> {
        const take = 12;

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
