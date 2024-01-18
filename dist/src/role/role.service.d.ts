import { IRole } from './models/role.schema';
import { AbstractService } from 'src/common/abstract.service';
import { Model } from 'mongoose';
export declare class RoleService extends AbstractService<IRole> {
    private roleModel;
    constructor(roleModel: Model<IRole>);
}
