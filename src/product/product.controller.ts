import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Request, Response } from 'express';
import { ProductCreateDto } from './dto/create-product.dto';
import { ProductUpdateDto } from './dto/update-product.dto';
import { isValidObjectId } from 'mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
import { HasPermission } from 'src/permission/decorator/permission.decorator';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService
    ) { }

    @Get()
    @HasPermission('products')
    async products(
        @Req() request: Request
    ) {
        let products = await this.productService.all();

        // * Search products
        if (request.query.search) {
            const search = request.query.search.toString().toLowerCase();
            products = products.filter(
                p => p.title.toLowerCase().indexOf(search) >= 0 ||
                    p.description.toLowerCase().indexOf(search) >= 0
            )
        }

        // * Paginating products
        const page: number = parseInt(request.query.page as any) || 1;
        const perPage = 9;
        const total = products.length;

        const data = products.slice((page - 1) * perPage, page * perPage)

        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / perPage)
        };
    }

    @Post()
    @HasPermission('products')
    async create(
        @Body() body: ProductCreateDto
    ) {
        return this.productService.create(body);
    }

    @Put(':id')
    @HasPermission('products')
    async update(
        @Res() response: Response,
        @Param('id') id: string,
        @Body() body: ProductUpdateDto
    ) {
        if (!isValidObjectId(id)) {
            throw new BadRequestException("Invalid Request");
        }
        return response.status(202).send(this.productService.update(id, body));
    }

    @Get(':id')
    @HasPermission('products')
    async get(
        @Param('id') id: string
    ) {
        if (!isValidObjectId(id)) {
            throw new BadRequestException("Invalid Request");
        }
        return this.productService.findById(id);
    }

    @Delete(':id')
    @HasPermission('products')
    async delete(
        @Param('id') id: string,
        @Res() response: Response,
    ) {
        if (!isValidObjectId(id)) {
            throw new BadRequestException("Invalid Request");
        }
        return response.status(204).send(this.productService.delete(id));
    }
}
