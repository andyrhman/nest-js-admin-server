import { PermissionDocument } from './models/permission.schema';
import { AbstractService } from 'src/common/abstract.service';
import { Model } from 'mongoose';
export declare class PermissionService extends AbstractService<PermissionDocument> {
    private readonly permissionModel;
    constructor(permissionModel: Model<PermissionDocument>);
}
