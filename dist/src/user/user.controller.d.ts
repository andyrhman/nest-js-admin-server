import { UserService } from './user.service';
import { User } from './models/user.entity';
import { UserDto } from './models/user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    all(): Promise<User[]>;
    create(body: UserDto): Promise<User>;
    get(id: string): Promise<User>;
}
