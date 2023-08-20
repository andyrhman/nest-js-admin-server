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

    async findOne(options) {
        return this.userRepository.findOne({ where: options });
    }

    // async findOne(condition): Promise<User> {
    //     return this.userRepository.findOne(condition);
    // }

    // Find a user by their username or email
    async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
        return this.userRepository.findOne({
            where: [{ username }, { email }],
        });
    }

    async create(data): Promise<User> {
        return this.userRepository.save(data);
    }
}
