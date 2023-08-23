import { ProductService } from './product.service';
import { ProductCreateDto } from './models/product-create.dto';
import { ProductUpdateDto } from './models/product-update.dto';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    all(page?: number): Promise<import("../common/paginated-result.interface").PaginatedResult>;
    create(body: ProductCreateDto): Promise<any>;
    get(id: string): Promise<any>;
    update(id: string, body: ProductUpdateDto): Promise<any>;
    delete(id: string): Promise<any>;
}
