import { Permission } from './models/permission.entity';
import { Repository } from 'typeorm';
import { AbstractService } from 'src/common/abstract.service';
export declare class PermissionService extends AbstractService {
    private readonly permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
}
