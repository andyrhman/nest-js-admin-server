import { UserService } from 'src/user/user.service';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class AuthController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(body: RegisterDto, response: Response): Promise<import("../user/user.entity").User>;
    login(email: string, password: string, response: Response): Promise<import("../user/user.entity").User>;
    user(request: Request): Promise<import("../user/user.entity").User>;
}
