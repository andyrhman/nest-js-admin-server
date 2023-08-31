import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
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
    async all(){
        return this.addressService.all(['user']);
    }

    @Post(':id')
    async create(
        @Req() request: Request,
        @Body() body: any
    ) {
        const authUser = await this.authService.userId(request);

        const address = await this.addressService.createAddress({
            street: body.street,
            city: body.city,
            province: body.province,
            zip: body.zip,
            country: body.country,
            phone: body.phone,
            user: authUser // Pass the fetched user instance to createAddress
        });

        return address;
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: any
    ) {
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
}
