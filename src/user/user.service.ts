import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema, IUser } from './models/user.schema';
import { Repository } from 'typeorm';
import { AbstractService } from 'src/common/abstract.service';

@Injectable()
export class UserService extends AbstractService<IUser> {
    constructor(
        @InjectModel('User') private userModel: Model<IUser>
    ) {
        super(userModel)
    }
    async create(data: any): Promise<IUser> {
        const newUser = new this.userModel(data);
        return newUser.save();
    }

    async find(): Promise<IUser[]> {
        return this.userModel.find().exec();
    }

    async findOne(options: any): Promise<IUser | null> {
        return this.userModel.findOne(options).exec();
    }

    async findById(id: string): Promise<IUser | null> {
        return this.userModel.findById(id).exec();
    }

    async update(id: string, updateUserDto: any): Promise<IUser | null> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async delete(id: string): Promise<IUser | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
    async findAll(page: number = 1, limit: number = 1): Promise<{ data: IUser[], total: number, page: number, last_page: number }> {
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
