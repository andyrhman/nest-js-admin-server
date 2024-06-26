import { Role } from './models/role.entity';
import { Repository } from 'typeorm';
import { AbstractService } from 'src/common/abstract.service';
export declare class RoleService extends AbstractService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    all(relations?: any[]): Promise<any[]>;
}
