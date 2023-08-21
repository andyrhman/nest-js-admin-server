import { User } from './models/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    all(): Promise<User[]>;
    paginate(page?: number): Promise<any>;
    create(data: any): Promise<User>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<any>;
    findOne(options: any): Promise<User>;
    findByUsernameOrEmail(username: string, email: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
}
