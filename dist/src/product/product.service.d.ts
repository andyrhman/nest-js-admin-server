import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Product } from './models/product.entity';
import { ProductImages } from './models/product-images.entity';
import { ProductCreateDto } from './models/product-create.dto';
import { ProductUpdateDto } from './models/product-update.dto';
export declare class ProductService extends AbstractService {
    private readonly productRepository;
    private readonly productImagesRepository;
    constructor(productRepository: Repository<Product>, productImagesRepository: Repository<ProductImages>);
    findProductImages(options: any): Promise<ProductImages>;
    deleteImages(productId: string): Promise<any>;
    createImages(dto: ProductCreateDto): Promise<any>;
    update(id: string, dto: ProductUpdateDto): Promise<any>;
    findProducts(search: string, page?: number): Promise<any>;
}
