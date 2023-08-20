import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    all(): Promise<User[]>;
    findOne(options: any): Promise<User>;
    findByUsernameOrEmail(username: string, email: string): Promise<User | null>;
    create(data: any): Promise<User>;
}
