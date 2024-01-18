import { UserService } from './user.service';
import { UserCreateDto } from './models/user-create.dto';
import { Response } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    all(page: number, limit: number, search: string): Promise<{
        data: any[];
        meta: import("src/common/paginated.interface").IPaginationMeta;
    }>;
    create(body: UserCreateDto, response: Response): Promise<any>;
}
