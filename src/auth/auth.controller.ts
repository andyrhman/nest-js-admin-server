import {
    Controller,
    Get,
    Post,
    Body,
    BadRequestException,
    NotFoundException,
    Res,
    Req,
    UseInterceptors,
    ClassSerializerInterceptor,
    UseGuards
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import * as Joi from 'joi';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor) // hide the password
@Controller()
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private authService: AuthService
    ) { }

    @Post('register')
    async register(
        @Body() body: RegisterDto,
        @Res({ passthrough: true }) response: Response
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
            password: hashPassword,
            role: { id: "3" }
        });
    }

    @Post('login')
    async login(
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response,
        @Body('rememberMe') rememberMe?: boolean
    ) {
        let user;

        // Check whether to find the user by email or username based on input.
        if (email) {
            user = await this.userService.findByEmail(email);
        } else {
            user = await this.userService.findByUsername(username);
        }

        // If user doesn't exist, throw a BadRequestException indicating invalid credentials.
        if (!user) {
            throw new BadRequestException('Username or Email is Invalid');
        }

        if (!await argon2.verify(user.password, password)) {
            throw new BadRequestException("Password is invalid")
        }

        // Calculate the expiration time for the refresh token
        // Generate a refresh token using the JWT service with the calculated expiration time.
        const refreshTokenExpiration = rememberMe
            ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
            : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Adding 7 days in milliseconds

        const jwt = await this.jwtService.signAsync({ id: user.id });

        response.cookie('user_session', jwt, { 
            httpOnly: true,
            expires: refreshTokenExpiration,
        });
        response.status(200);

        return jwt;
    }

    // Getting the authenticated user.
    @UseGuards(AuthGuard)
    @Get('user')
    async user(
        @Req() request: Request,
    ) {
        const id = await this.authService.userId(request);

        return this.userService.findOne({ id });
    }

    // Getting the authenticated user.
    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(
        @Res({ passthrough: true }) response: Response
    ) {
        response.clearCookie('user_session');

        return {
            message: "success"
        }
    }
}
