import { UserService } from './user.service';
import { User } from './models/user.entity';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/user-update.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    all(page?: number): Promise<User[]>;
    create(body: UserCreateDto): Promise<User>;
    get(id: string): Promise<User>;
    update(id: string, body: UserUpdateDto): Promise<User>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
