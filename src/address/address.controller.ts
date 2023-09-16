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

        const checkAddress = await this.addressService.findOne({ userId: id });

        if (!checkAddress) {
            throw new NotFoundException('Address not found');
        }

        return this.addressService.findOne({ userId: id });  // Use the explicit column in the query
    }

    // * Update Address
    @Put()
    async update(
        @Body() body: any,
        @Req() request: Request,
    ) {
        const id = await this.authService.userId(request);

        const checkAddress = await this.addressService.findOne({ userId: id });

        if (!checkAddress) {
            throw new NotFoundException('Address not found');
        }

        await this.addressService.update(checkAddress, {
            street: body.street,
            city: body.city,
            province: body.province,
            zip: body.zip,
            country: body.country,
            phone: body.phone,
        });

        return {
            message: "Updated Successfully!"
        };
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

    // * Update specific address data
    // @Put()
    // async update(
    //     @Body() body: any,
    //     @Req() request: Request,
    // ) {
    //     const { street, city, province, zip, country, phone } = body;
    //     const id = await this.authService.userId(request);

    //     const checkAddress = await this.addressService.findOne({ userId: id });

    //     if (!checkAddress) {
    //         throw new NotFoundException('Address not found');
    //     }

    //     const updateData: { [key: string]: string | number | undefined } = {};
    //     if (body.street !== undefined) {
    //         updateData.street = body.street;
    //     }
    //     if (body.city !== undefined) {
    //         updateData.city = body.city;
    //     }
    //     if (body.province !== undefined) {
    //         updateData.province = body.province;
    //     }
    //     if (body.zip !== undefined) {
    //         updateData.zip = body.zip;
    //     }
    //     if (body.country !== undefined) {
    //         updateData.country = body.country;
    //     }
    //     if (body.phone !== undefined) {
    //         updateData.phone = body.phone;
    //     }

    //     await this.addressService.update(checkAddress, updateData);

    //     return {
    //         message: "Updated Successfully!"
    //     };
    // }
}
