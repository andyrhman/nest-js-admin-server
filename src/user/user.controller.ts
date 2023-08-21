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
    Query
}
    from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.entity';
import * as argon2 from 'argon2';
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from '../auth/auth.guard';
import { isUUID } from 'class-validator'; // Import class-validator for UUID validation
import { RoleService } from 'src/role/role.service';

@UseInterceptors(ClassSerializerInterceptor) // hide the password
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private roleService: RoleService
    ) {

    }

    @Get()
    async all(@Query('page') page: number = 1): Promise<User[]> {
        return await this.userService.paginate(page);
    }

    @Post()
    async create(@Body() body: UserCreateDto): Promise<User> {
        const password = await argon2.hash('123456');

        // Check if the username or email already exists
        const existingUser = await this.userService.findByUsernameOrEmail(
            body.username,
            body.email,
        );

        if (existingUser) {
            throw new BadRequestException('Username or email already exists');
        }

        return this.userService.create({
            username: body.username,
            email: body.email,
            password,
            role: { id: body.role_id }
        });
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid UUID format');
        }

        const search = await this.userService.findOne({ id });

        if (!search) {
            throw new NotFoundException('User not found');
        }

        return search;
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: any,
    ) {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid UUID format');
        }

        const existingUser = await this.userService.findOne({ id });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        const { username, email, role_id } = body;

        // Check if username already exists and is different from the existing one
        if (username && username !== existingUser.username) {
            const existingUsername = await this.userService.findByUsername(username);
            if (existingUsername) {
                throw new BadRequestException('Username already exists');
            }
            existingUser.username = username;
        }

        // Check if email already exists and is different from the existing one
        if (email && email !== existingUser.email) {
            const existingEmail = await this.userService.findByEmail(email);
            if (existingEmail) {
                throw new BadRequestException('Email already exists');
            }
            existingUser.email = email;
        }

        // Update the role if role_id is provided
        if (role_id) {
            const role = await this.roleService.findOne({ id: role_id });
            if (!role) {
                throw new NotFoundException('Role not found');
            }
            existingUser.role = role;
        }

        // Perform the update
        await this.userService.update(id, existingUser);

        return this.userService.findOne({ id });
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
    ) {
        await this.userService.delete(id);

        return {
            message: "User deleted sucessfully"
        }
    }
}
