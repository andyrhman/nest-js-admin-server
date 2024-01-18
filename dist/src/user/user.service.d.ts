import { Model } from 'mongoose';
import { IUser } from './models/user.schema';
import { AbstractService } from 'src/common/abstract.service';
export declare class UserService extends AbstractService<IUser> {
    private userModel;
    constructor(userModel: Model<IUser>);
    findAll(page?: number, limit?: number): Promise<{
        data: IUser[];
        total: number;
        page: number;
        last_page: number;
    }>;
}
