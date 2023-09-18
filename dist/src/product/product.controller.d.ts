import { ProductService } from './product.service';
import { ProductCreateDto } from './models/product-create.dto';
import { ProductUpdateDto } from './models/product-update.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { OrderService } from 'src/order/order.service';
import { Product } from './models/product.entity';
export declare class ProductController {
    private productService;
    private orderService;
    private userService;
    private authService;
    constructor(productService: ProductService, orderService: OrderService, userService: UserService, authService: AuthService);
    all(page?: number): Promise<import("../common/paginated-result.interface").PaginatedResult>;
    show(): Promise<any[]>;
    findUsers(search: string, page?: number): Promise<Product[]>;
    test(request: Request, body: any): Promise<{
        message: string;
    }>;
    create(body: ProductCreateDto): Promise<any>;
    get(id: string): Promise<any>;
    update(id: string, body: ProductUpdateDto): Promise<any>;
    delete(id: string): Promise<any>;
}
