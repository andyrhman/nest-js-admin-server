import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { FastifyReply } from 'fastify';
import * as argon2 from 'argon2';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService
    ) { }

    @Post('register')
    async register(
        @Body() body: RegisterDto,
        @Res() response: FastifyReply
    ) {
        if (body.password !== body.confirm_password) {
            throw new BadRequestException("Password do not match.");
        }

        // Check if the username or email already exists
        const existingUser = await this.userService.findByUsernameOrEmail(
            body.username,
            body.email,
        );

        if (existingUser) {
            throw new BadRequestException('Username or email already exists');
        }

        // Hash Password
        const hashPassword = await argon2.hash(body.password);

        response.status(200);
        return this.userService.create({
            username: body.username,
            email: body.email,
            password: hashPassword
            // role: { id: "3" }
        });
    }
}
