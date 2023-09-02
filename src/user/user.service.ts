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

    async paginate(page = 1, relations = []): Promise<PaginatedResult> {
        const { data, meta } = await super.paginate(page, relations);

        return {
            // Hiding the password, don't use if you already used Interceptor.
            data: data.map(user => {
                const { password, ...data } = user;

                return data;
            }),
            meta
        }
    }

    async findUsersByUsernameOrEmail(search: string): Promise<User[]> {
        return this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role') // Join the role table and alias it as 'role'
            .where('user.username ILIKE :search OR user.email ILIKE :search', { search: `%${search}%` })
            .getMany();
    }

}
