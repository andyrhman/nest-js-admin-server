import { Injectable } from '@nestjs/common';
import { IRole } from './models/role.schema';
import { AbstractService } from 'src/common/abstract.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoleService extends AbstractService<IRole>{
    constructor(
        @InjectModel('Role') private roleModel: Model<IRole>
    ) {
        super(roleModel);
    }

}
