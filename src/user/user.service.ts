import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginated-result.interface';

@Injectable()
export class UserService extends AbstractService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
        super(userRepository);
    }

    async paginate(page = 1, relations = []): Promise<any> {
        const take = 1;

        const [users, total] = await this.userRepository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations
        });

        return {
            // Hiding the password, don't use if you already used Interceptor.
            data: users.map(user => {
                const { password, ...data } = user;

                return data;
            }),
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    }

    async findUsersByUsernameOrEmail(search: string, page = 1): Promise<any> {
        const take = 1;

        const [users, total] = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role') // Join the role table and alias it as 'role'
            .where('user.username ILIKE :search OR user.email ILIKE :search', { search: `%${search}%` })
            .skip((page - 1) * take)
            .take(take)
            .getManyAndCount();

        return {
            data: users.map(user => {
                const { password, ...data } = user;

                return data;
            }),
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    }

    async findUsersRegister(search: string): Promise<User[]> { // Change the return type to User[]
        return this.userRepository
        .createQueryBuilder('user')
        .where('user.username ILIKE :search OR user.email ILIKE :search', { search: `%${search}%` })
        .getMany();
    }


}
