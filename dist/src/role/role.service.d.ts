import { Role } from './models/role.entity';
import { Repository } from 'typeorm';
export declare class RoleService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    all(): Promise<Role[]>;
    create(data: any): Promise<Role>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<any>;
    findOne(options: any): Promise<Role>;
}
