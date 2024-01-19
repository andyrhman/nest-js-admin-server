import { RoleDocument } from './models/role.schema';
import { AbstractService } from 'src/common/abstract.service';
import { Model } from 'mongoose';
export declare class RoleService extends AbstractService<RoleDocument> {
    private roleModel;
    constructor(roleModel: Model<RoleDocument>);
}
