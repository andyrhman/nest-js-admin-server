import { RoleService } from './role.service';
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    all(): Promise<import("./models/role.entity").Role[]>;
    create(name: string, ids: number[]): Promise<import("./models/role.entity").Role>;
    get(id: number): Promise<import("./models/role.entity").Role>;
    update(id: number, name: string, ids: number[]): Promise<import("./models/role.entity").Role>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
