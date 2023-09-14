import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductCreateDto } from './models/product-create.dto';
import { ProductUpdateDto } from './models/product-update.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { OrderService } from 'src/order/order.service';
import { Product } from './models/product.entity';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService,
        private orderService: OrderService,
        private userService: UserService,
        private authService: AuthService
    ) { }

    // Get all prodcuts
    @Get()
    async all(@Query('page') page = 1) {
        return this.productService.paginate(page);
    }

    // Find specific product
    @Get('product')
    async findUsers(@Query('search') search: string, @Query('page') page: number = 1): Promise<Product[]> {
        // Check for malicious characters in the search input
        if (/[<>]/.test(search)) {
            throw new BadRequestException("Invalid product input");
        }

        const products = await this.productService.findProducts(search, page);

        if (products.length === 0) {
            throw new NotFoundException(`Can't find any results for your search: ${search}`);
        }

        return products;
    }

    @Post('order-products')
    async test(
        @Req() request: Request,
        @Body() body: any
    ) {
        const { id, quantity } = body;

        const userId = await this.authService.userId(request);

        const user = await this.userService.findOne({ id: userId });

        const productData = await this.productService.findOne({ id: id });

        const exstingOrder = await this.orderService.findOne({ userId: userId });

        if (exstingOrder) {
            await this.orderService.createOrderItem({
                product_title: productData.title,
                price: productData.price,
                quantity: quantity,
                order: exstingOrder.id
            });
        } else if (!exstingOrder) {
            await this.orderService.createOrders({
                name: user.username,
                email: user.email,
                product_title: productData.title,
                price: productData.price,
                quantity: quantity,
                userId: userId
            });
        }

        return {
            message: "Your order has been created!"
        };
    }


    // Create Products
    @Post()
    async create(@Body() body: ProductCreateDto) {
        return this.productService.create(body);
    }

    // Get one products
    @Get(':id')
    async get(@Param('id') id: string) {
        return this.productService.findOne({ id });
    }

    // Update Products
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: ProductUpdateDto
    ) {
        await this.productService.update(id, body);

        return this.productService.findOne({ id });
    }

    // Delete Products
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.productService.delete(id);
    }

    // Order Products
    // https://www.phind.com/search?cache=wdvxsmhkrcrqiw58fftdzj28
    // @Post('order-products')
    // async orderProducts(
    //     @Req() request: Request,
    //     @Body() orderData: { products: { id: string; quantity: number }[] }

    // ) {
    //     const authUserId = await this.authService.userId(request);
    //     const user = await this.userService.findOne({ id: authUserId });

    //     // Create an array to store product data for each product
    //     const products = [];

    //     for (const productData of orderData.products) {
    //         const product = await this.productService.findOne({ id: productData.id });
    //         if (!product) {
    //             throw new NotFoundException(`Product with ID ${productData.id} not found`);
    //         }

    //         // Add product data to products array
    //         products.push({
    //             product_title: product.title,
    //             price: product.price,
    //             quantity: productData.quantity
    //         });
    //     }

    //     // Call createOrderItem with products array
    //     await this.orderService.createOrderItem({
    //         name: user.username,
    //         email: user.email,
    //         products
    //     });

    //     return {
    //         message: "Your order has been created!"
    //     };
    // }
}
