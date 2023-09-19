import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Product } from './models/product.entity';
import { ProductImages } from './models/product-images.entity';
export declare class ProductService extends AbstractService {
    private readonly productRepository;
    private readonly productImagesRepository;
    constructor(productRepository: Repository<Product>, productImagesRepository: Repository<ProductImages>);
    findProductImages(options: any): Promise<ProductImages>;
    deleteImages(productId: string): Promise<any>;
    createImages(data: any): Promise<any>;
    update(id: string, body: any): Promise<any>;
    findProducts(search: string, page?: number): Promise<any>;
}
