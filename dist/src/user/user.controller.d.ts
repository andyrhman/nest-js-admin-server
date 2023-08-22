import { UserService } from './user.service';
import { User } from './models/user.entity';
import { UserCreateDto } from './models/user-create.dto';
import { RoleService } from 'src/role/role.service';
export declare class UserController {
    private userService;
    private roleService;
    constructor(userService: UserService, roleService: RoleService);
    all(page?: number): Promise<import("../common/paginated-result.interface").PaginatedResult>;
    create(body: UserCreateDto): Promise<User>;
    get(id: string): Promise<any>;
    update(id: string, body: any): Promise<any>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
