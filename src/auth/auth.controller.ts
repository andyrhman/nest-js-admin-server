import { BadRequestException, Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { FastifyReply } from 'fastify';
import { Request } from 'express';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

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
        @Res({ passthrough: true }) response: FastifyReply
    ) {
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

        const user = await this.userService.create({
            fullName: body.fullname,
            username: body.username,
            email: body.email,
            password: hashPassword,
            role: "65a9c6ce8b30772f51cd1249"
        });

        const { password, ...data } = user.toObject();

        return response.status(201).send(data);
    }

    @Post('login')
    async login(
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: FastifyReply,
        @Body('rememberMe') rememberMe?: boolean
    ) {
        try {
            let user;

            // Check whether to find the user by email or username based on input.
            if (email) {
                user = await this.userService.findByEmail(email);
            } else {
                user = await this.userService.findByUsername(username);
            }

            // If user doesn't exist, throw a BadRequestException indicating invalid credentials.
            if (!user) {
                throw new BadRequestException('Invalid Credentials');
            }

            if (!await argon2.verify(user.password, password)) {
                throw new BadRequestException("Invalid Credentials")
            }

            // Calculate the expiration time for the refresh token
            // Generate a refresh token using the JWT service with the calculated expiration time.
            const refreshTokenExpiration = rememberMe
                ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
                : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Adding 7 days in milliseconds

            const jwt = await this.jwtService.signAsync({ id: user._id });

            response.setCookie('user_session', jwt, {
                httpOnly: true,
                expires: refreshTokenExpiration,
                secure: true
            });
            response.status(200);

            return {
                message: "Successfully Logged In!"
            };
        } catch (error) {
            return new BadRequestException(error.message);
        }
    }

    // Getting the authenticated user.
    @UseGuards(AuthGuard)
    @Get('user')
    async user(
        @Req() request: Request,
    ) {
        const id = await this.authService.userId(request);

        return await this.userService.findUserAndRole(id);
    }

    // Getting the authenticated user.
    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(
        @Res({ passthrough: true }) response: FastifyReply
    ) {
        response.clearCookie('user_session', { path: '/api' });

        return response.status(200).send({
            message: "success"
        })
    }
}
