import { UserService } from './user.service';
import { User } from './models/user.entity';
import { UserCreateDto } from './models/user-create.dto';
import { RoleService } from 'src/role/role.service';
export declare class UserController {
    private userService;
    private roleService;
    constructor(userService: UserService, roleService: RoleService);
    all(page?: number): Promise<User[]>;
    create(body: UserCreateDto): Promise<User>;
    get(id: string): Promise<User>;
    update(id: string, body: any): Promise<User>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
