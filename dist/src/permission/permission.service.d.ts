import { IPermission } from './models/permission.schema';
import { AbstractService } from 'src/common/abstract.service';
import { Model } from 'mongoose';
export declare class PermissionService extends AbstractService<IPermission> {
    private readonly permissionModel;
    constructor(permissionModel: Model<IPermission>);
}
