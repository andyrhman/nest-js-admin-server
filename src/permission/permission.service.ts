import { Injectable } from '@nestjs/common';
import { IPermission } from './models/permission.schema';
import { AbstractService } from 'src/common/abstract.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PermissionService extends AbstractService<IPermission>{
    constructor(
        @InjectModel('Permission') private readonly permissionModel: Model<IPermission>
    ) { 
        super(permissionModel);
    }
}
