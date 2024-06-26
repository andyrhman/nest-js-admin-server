import { RoleService } from './role.service';
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    all(): Promise<any[]>;
    create(name: string, ids: number[]): Promise<any>;
    get(id: number): Promise<any>;
    update(id: string, name: string, ids: number[]): Promise<any>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
