import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './models/user.schema';
import { AbstractService } from 'src/common/abstract.service';

@Injectable()
export class UserService extends AbstractService<UserDocument>{
    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>
    ) {
        super(userModel)
    }

    async findUserAndRole(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).populate('role').exec();
    }

    async findAll(page: number = 1, limit: number = 1): Promise<{ data: UserDocument[], total: number, page: number, last_page: number }> {
        const skip = (page - 1) * limit;
        const total = await this.userModel.countDocuments().exec();
        const data = await this.userModel.find().limit(limit).skip(skip).exec();
        const last_page = Math.ceil(total / limit);

        return {
            data,
            total,
            page,
            last_page,
        };
    }
}
