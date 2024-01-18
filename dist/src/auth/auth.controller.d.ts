import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { FastifyReply } from 'fastify';
export declare class AuthController {
    private userService;
    constructor(userService: UserService);
    register(body: RegisterDto, response: FastifyReply): Promise<import("../user/models/user.schema").IUser>;
}
