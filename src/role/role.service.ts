import { Injectable } from '@nestjs/common';
import { RoleDocument } from './models/role.schema';
import { AbstractService } from 'src/common/abstract.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoleService extends AbstractService<RoleDocument>{
    constructor(
        @InjectModel('Role') private roleModel: Model<RoleDocument>
    ) {
        super(roleModel);
    }

    async findAllRoles(): Promise<RoleDocument[]> {
        return this.roleModel.find().populate('permissions').exec();
    }

    async findRolesAndPopulate(id: string): Promise<RoleDocument | null> {
        return this.roleModel.findById(id).populate('permissions').exec();
    }

}
