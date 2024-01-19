import { Injectable } from '@nestjs/common';
import { PermissionDocument } from './models/permission.schema';
import { AbstractService } from 'src/common/abstract.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PermissionService extends AbstractService<PermissionDocument>{
    constructor(
        @InjectModel('Permission') private readonly permissionModel: Model<PermissionDocument>
    ) { 
        super(permissionModel);
    }
}
