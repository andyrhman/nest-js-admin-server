import { Permission } from './models/permission.entity';
import { Repository } from 'typeorm';
export declare class PermissionService {
    private readonly permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
    all(): Promise<Permission[]>;
    findOne(options: any): Promise<Permission>;
}
