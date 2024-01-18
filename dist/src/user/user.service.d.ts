import { Model } from 'mongoose';
import { IUser } from './models/user.schema';
import { AbstractService } from 'src/common/abstract.service';
export declare class UserService extends AbstractService<IUser> {
    private userModel;
    constructor(userModel: Model<IUser>);
    create(data: any): Promise<IUser>;
    find(): Promise<IUser[]>;
    findOne(options: any): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
    update(id: string, updateUserDto: any): Promise<IUser | null>;
    delete(id: string): Promise<IUser | null>;
    findAll(page?: number, limit?: number): Promise<{
        data: IUser[];
        total: number;
        page: number;
        last_page: number;
    }>;
}
