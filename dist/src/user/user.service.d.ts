import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { AbstractService } from 'src/common/abstract.service';
export declare class UserService extends AbstractService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    paginate(page?: number, relations?: any[]): Promise<any>;
    findUsersByUsernameOrEmail(search: string, page?: number): Promise<any>;
    findUsersRegister(search: string): Promise<User[]>;
}
