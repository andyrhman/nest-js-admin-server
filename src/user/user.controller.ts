import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    UseInterceptors,
    ClassSerializerInterceptor,
    UseGuards,
    Param,
    NotFoundException,
    Put,
    Delete,
    Query,
    Req,
    Res,
    ConflictException
}
    from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.schema';
import * as argon2 from 'argon2';
import { UserCreateDto } from './models/user-create.dto';
// import { AuthGuard } from '../auth/auth.guard';
import { isUUID } from 'class-validator'; // Import class-validator for UUID validation
import { RoleService } from 'src/role/role.service';
import { Request, Response } from 'express';
// import { AuthService } from 'src/auth/auth.service';
import { HasPermission } from 'src/permission/decorator/permission.decorator';

// @UseInterceptors(ClassSerializerInterceptor) // hide the password
@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        // private roleService: RoleService,
        // private authService: AuthService
    ) { }

    // @Get()
    // @UseGuards(AuthGuard)
    // @HasPermission('users')
    // async all(@Query('page') page: number = 1) {
    //     return await this.userService.paginate(page, ['role']);
    // }

    @Post()
    // @UseGuards(AuthGuard)
    // @HasPermission('users')
    async create(
        @Body() body: UserCreateDto,
        @Res({ passthrough: true }) response: Response
    ) {
        const hashedPassword = await argon2.hash('123456');

        // Check if the username or email already exists
        const emailExists = await this.userService.findOne({ email: body.email.toLowerCase() });
        const usernameExists = await this.userService.findOne({ username: body.username.toLowerCase() });

        if (emailExists || usernameExists) {
            throw new BadRequestException('Email or username already exists')
        }

        const user = await this.userService.create({
            fullName: body.fullname,
            username: body.username,
            email: body.email,
            password: hashedPassword,
            // role: { id: body.role_id }
        });

        const { password, ...data } = user.toObject();

        response.status(201);
        
        return data;
    }

    // @Get(':id')
    // @UseGuards(AuthGuard)
    // @HasPermission('users')
    // async get(@Param('id') id: string) {
    //     if (!isUUID(id)) {
    //         throw new BadRequestException('Invalid UUID format');
    //     }

    //     const search = await this.userService.findOne({ id }, ['role']);

    //     if (!search) {
    //         throw new NotFoundException('User not found');
    //     }

    //     return search;
    // }

    // // User update their own info
    // @Put('info')
    // @UseGuards(AuthGuard)
    // async updateInfo(
    //     @Req() request: Request,
    //     @Body() body: any,
    //     @Res({ passthrough: true }) response: Response
    // ) {
    //     const id = await this.authService.userId(request);
    //     const existingUser = await this.userService.findOne({ id });

    //     if (!existingUser) {
    //         throw new NotFoundException('User not found');
    //     }

    //     if (body.email && body.email !== existingUser.email) {
    //         const existingUserByEmail = await this.userService.findByEmail(body.email);
    //         if (existingUserByEmail) {
    //             throw new ConflictException('Email already exists');
    //         }
    //         existingUser.email = body.email;
    //     }

    //     if (body.username && body.username !== existingUser.username) {
    //         const existingUserByUsername = await this.userService.findByUsername(body.username);
    //         if (existingUserByUsername) {
    //             throw new ConflictException('Username already exists');
    //         }
    //         existingUser.username = body.username;
    //     }

    //     await this.userService.update(id, existingUser);
    //     response.status(202);
    //     return this.userService.findOne({ id });
    // }

    // // User update their own password
    // @Put('password')
    // @UseGuards(AuthGuard)
    // async updatePassword(
    //     @Req() request: Request,
    //     @Body() body: any,
    //     @Res({ passthrough: true }) response: Response
    // ) {
    //     if (body.password !== body.confirm_password) {
    //         throw new BadRequestException("Password do not match.");
    //     }

    //     const id = await this.authService.userId(request);

    //     const hashPassword = await argon2.hash(body.password);

    //     await this.userService.update(id, {
    //         password: hashPassword
    //     });

    //     response.status(202);
    //     return this.userService.findOne({ id });
    // }

    // // * Admin update the user info
    // @Put(':id')
    // @UseGuards(AuthGuard)
    // @HasPermission('users')
    // async update(
    //     @Param('id') id: string,
    //     @Body() body: any,
    //     @Res({ passthrough: true }) response: Response
    // ) {
    //     if (!isUUID(id)) {
    //         throw new BadRequestException('Invalid UUID format');
    //     }

    //     const existingUser = await this.userService.findOne({ id });

    //     if (!existingUser) {
    //         throw new NotFoundException('User not found');
    //     }

    //     const { username, email, role_id } = body;

    //     // Check if username already exists and is different from the existing one
    //     if (username && username !== existingUser.username) {
    //         const existingUsername = await this.userService.findByUsername(username);
    //         if (existingUsername) {
    //             throw new BadRequestException('Username already exists');
    //         }
    //         existingUser.username = username;
    //     }

    //     // Check if email already exists and is different from the existing one
    //     if (email && email !== existingUser.email) {
    //         const existingEmail = await this.userService.findByEmail(email);
    //         if (existingEmail) {
    //             throw new BadRequestException('Email already exists');
    //         }
    //         existingUser.email = email;
    //     }

    //     // Update the role if role_id is provided
    //     if (role_id) {
    //         const role = await this.roleService.findOne({ id: role_id });
    //         if (!role) {
    //             throw new NotFoundException('Role not found');
    //         }
    //         existingUser.role = role;
    //     }

    //     // Perform the update
    //     await this.userService.update(id, existingUser);

    //     response.status(202);
    //     return this.userService.findOne({ id });
    // }

    // @Delete(':id')
    // @UseGuards(AuthGuard)
    // @HasPermission('users')
    // async delete(
    //     @Param('id') id: string,
    //     @Res({ passthrough: true }) response: Response
    // ) {
    //     await this.userService.delete(id);

    //    return response.status(204).send(null);

    // }
}
