import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Product } from './models/product.entity';
import { ProductImages } from './models/product-images.entity';
import slugify from 'slugify';

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

    async createImages(data): Promise<any> {
        const product = new Product();
        product.title = data.title;
        product.slug = slugify(data.title, {
            lower: true,      // convert to lower case, defaults to `false`
            strict: true,     // strip special characters except replacement, defaults to `false`
            trim: true        // trim leading and trailing replacement chars, defaults to `true`.
        });
        product.description = data.description;
        product.image = data.image; // primary image of the product
        product.price = data.price;
        await this.productRepository.save(product);

        if (Array.isArray(data.images)) {
            for (const imageUrl of data.images) {
                const productImage = new ProductImages();
                productImage.productId = product.id;
                productImage.image = imageUrl;
                await this.productImagesRepository.save(productImage);
            }
        } else {
            throw new BadRequestException("Images field is required and it should be an array");
        }

        return product;
    }

    async update(id: string, body): Promise<any> {
        const product = new Product();
        product.title = body.title;
        product.slug = slugify(body.title, {
            lower: true,      // convert to lower case, defaults to `false`
            strict: true,     // strip special characters except replacement, defaults to `false`
            trim: true        // trim leading and trailing replacement chars, defaults to `true`
        });
        product.description = body.description;
        product.image = body.image; // primary image of the product
        product.price = body.price;
        await this.productRepository.update(id, product);

        if (Array.isArray(body.images)) {
            for (const imageUrl of body.images) {
                const productImage = new ProductImages();
                productImage.productId = id;
                productImage.image = imageUrl;
                await this.productImagesRepository.save(productImage);
            }
        } else {
            throw new BadRequestException("Images field is required and it should be an array");
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
