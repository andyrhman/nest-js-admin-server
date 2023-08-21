import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    // Find all user in the DB
    async all(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async paginate(page = 1): Promise<any> {
        const take = 1;

        const [users, total] = await this.userRepository.findAndCount({
            take,
            skip: (page - 1) * take
        });

        return {
            // Hiding the password, don't use if you already used Interceptor.
            // data: users.map(user => {
            //     const { password, ...data } = user;

            //     return data;
            // }),
            data: users,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    }

    async create(data): Promise<User> {
        return this.userRepository.save(data);
    }

    async update(id: string, data): Promise<any> {
        return this.userRepository.update(id, data);
    }

    async delete(id: string): Promise<any> {
        return this.userRepository.delete(id);
    }

    async findOne(options) {
        return this.userRepository.findOne({ where: options });
    }

    // Find a user by their username or email
    async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
        return this.userRepository.findOne({
            where: [{ username }, { email }],
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } }); // Use the 'where' option
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { username } }); // Use the 'where' option
    }

}
