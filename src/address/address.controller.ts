import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { isUUID } from 'class-validator'; // Import class-validator for UUID validation

@UseGuards(AuthGuard)
@Controller('address')
export class AddressController {
    constructor(
        private addressService: AddressService,
        private userService: UserService,
        private authService: AuthService
    ) { }

    @Get()
    async all() {
        return this.addressService.all(['user']);
    }

    @Post()
    async create(
        @Req() request: Request,
        @Body() body: any
    ) {
        const authUser = await this.authService.userId(request);

        await this.addressService.create({
            street: body.street,
            city: body.city,
            province: body.province,
            zip: body.zip,
            country: body.country,
            phone: body.phone,
            userId: authUser // Pass the fetched user instance to createAddress
        });

        return {
            message: "Address created successfully"
        };
    }

    @Post('test')
    async test(
        @Req() request: Request,
        @Body() body: any
    ) {
        const authUser = await this.authService.userId(request);
        const existingAddress = await this.addressService.findOne({ userId: authUser })

        if (existingAddress) {
            throw new BadRequestException('address already exists');
        }
        
        await this.addressService.create({
            street: body.street,
            city: body.city,
            province: body.province,
            zip: body.zip,
            country: body.country,
            phone: body.phone,
            userId: authUser // Pass the fetched user instance to createAddress
        });

        return {
            message: "Address created successfully"
        };

    }

    @Get('user')
    async get(
        @Req() request: Request,
    ) {
        const id = await this.authService.userId(request);

        return this.addressService.findOne({ userId: id });  // Use the explicit column in the query
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: any
    ) {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid UUID format');
        }

        const address = await this.addressService.findOne({ id });
        if (!address) {
            throw new NotFoundException("Address is not exists");
        }

        await this.addressService.update(id, {
            street: body.street,
            city: body.city,
            province: body.province,
            zip: body.zip,
            country: body.country,
            phone: body.phone,
        });

        return this.addressService.findOne({ id });
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string
    ) {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid UUID format');
        }

        await this.addressService.delete(id);

        return {
            message: "Address is deleted successfully"
        }
    }
}
