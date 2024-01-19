import { Model } from 'mongoose';
import { UserDocument } from './models/user.schema';
import { AbstractService } from 'src/common/abstract.service';
export declare class UserService extends AbstractService<UserDocument> {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findAll(page?: number, limit?: number): Promise<{
        data: UserDocument[];
        total: number;
        page: number;
        last_page: number;
    }>;
}
