import { Model } from 'mongoose';
import { User } from './models/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: any): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(options: any): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(id: string, updateUserDto: any): Promise<User | null>;
    delete(id: string): Promise<User | null>;
}
