import { Body, Controller, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('address')
export class AddressController {
    constructor(
        private addressService: AddressService,
        private userService: UserService,
        private authService: AuthService
    ) {}


    @Post(':id')
    async create(
        @Req() request: Request,
        @Body() body: any
    ){
        const authUser = await this.authService.userId(request);
        const user = await this.userService.findOne({id: authUser})

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.addressService.createAddress({
            street: body.street,
            city: body.city,
            province: body.province,
            zip: body.zip,
            country: body.country,
            phone: body.phone,
            user: user // Pass the fetched user instance to createAddress
        });
    }
}
