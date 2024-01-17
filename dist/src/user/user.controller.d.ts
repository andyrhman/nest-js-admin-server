import { UserService } from './user.service';
import { UserCreateDto } from './models/user-create.dto';
import { Response } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(body: UserCreateDto, response: Response): Promise<any>;
}
