import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.schema';
import { Repository } from 'typeorm';
// import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginated-result.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async create(createUserDto: any): Promise<User> {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(options: any): Promise<User | null> {
        return this.userModel.findOne(options).exec();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async update(id: string, updateUserDto: any): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async delete(id: string): Promise<User | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
