import { RoleService } from './role.service';
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    all(): Promise<import("./models/role.entity").Role[]>;
    create(name: string): Promise<import("./models/role.entity").Role>;
    get(id: string): Promise<import("./models/role.entity").Role>;
    update(id: string, name: string): Promise<import("./models/role.entity").Role>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
