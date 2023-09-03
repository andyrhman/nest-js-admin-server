import { UserService } from './user.service';
import { User } from './models/user.entity';
import { UserCreateDto } from './models/user-create.dto';
import { RoleService } from 'src/role/role.service';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
export declare class UserController {
    private userService;
    private roleService;
    private authService;
    constructor(userService: UserService, roleService: RoleService, authService: AuthService);
    findUsers(search: string, page?: number): Promise<User[]>;
    all(page?: number): Promise<any>;
    create(body: UserCreateDto): Promise<User>;
    get(id: string): Promise<any>;
    updateInfo(request: Request, body: any): Promise<any>;
    updatePassword(request: Request, body: any): Promise<any>;
    update(id: string, body: any): Promise<any>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
