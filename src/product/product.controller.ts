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
import * as Joi from 'joi';

const productCreate = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': `"Title" is required`,
    }),
    description: Joi.string().required().messages({
        'string.empty': `"Description" is required`,
    }),
    image: Joi.string().required().messages({
        'string.empty': `"Image" is required`,
    }),
    price: Joi.number().required().messages({
        'number.empty': `"Price" is required`,
    }),
    images: Joi.array().items(Joi.string().required().messages({
        'string.empty': `"Images" is required`
    })).min(1).messages({
        'array.min': `"Images" must have at least one item`
    })
});

const productUpdate = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number(),
    images: Joi.array().items(Joi.string().required().messages({
        'string.empty': `"Images" is required`,
    })).min(1).messages({
        'array.min': `"Images" must have at least one item`
    })
});

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

    @Get('show')
    async show() {
        return this.productService.all();
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
    async create(
        @Body() body: any
    ) {
        const { error } = productCreate.validate(body);
        if (error) {
            throw new BadRequestException(error.message);
        }

        return this.productService.createImages(body);
    }

    // Get one products
    @Get(':id')
    @UseGuards(AuthGuard)
    async get(@Param('id') id: string) {
        return this.productService.findOne({ id });
    }

    // Update Products
    @Put(':id')
    @UseGuards(AuthGuard)
    async update(
        @Param('id') id: string,
        @Body() body: any
    ) {
        const findImages = await this.productService.findProductImages({ productId: id });

        if (findImages) {
            await this.productService.deleteImages(findImages.productId);
        }

        const { error } = productUpdate.validate(body);
        if (error) {
            throw new BadRequestException(error.message);
        }

        await this.productService.update(id, body);

        return this.productService.findOne({ id });
    }

    // Delete Products
    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: string) {
        // Find the related images
        const findImages = [await this.productService.findProductImages({ productId: id })];

        // Delete the related images
        for (const image of findImages) {
            await this.productService.deleteImages(image.productId);
        }

        // Delete the product
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
