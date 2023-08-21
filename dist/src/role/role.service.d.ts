import { Role } from './models/role.entity';
import { Repository } from 'typeorm';
export declare class RoleService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    all(): Promise<Role[]>;
    create(data: any): Promise<Role>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<any>;
    findOne(options: any): Promise<Role>;
}
