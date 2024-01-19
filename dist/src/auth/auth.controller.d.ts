/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { FastifyReply } from 'fastify';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
export declare class AuthController {
    private userService;
    private jwtService;
    private authService;
    constructor(userService: UserService, jwtService: JwtService, authService: AuthService);
    register(body: RegisterDto, response: FastifyReply): Promise<never>;
    login(username: string, email: string, password: string, response: FastifyReply, rememberMe?: boolean): Promise<BadRequestException>;
    user(request: Request): Promise<import("mongoose").Document<unknown, {}, import("../user/models/user.schema").IUser> & import("../user/models/user.schema").IUser & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    logout(response: FastifyReply): Promise<{
        message: string;
    }>;
}
