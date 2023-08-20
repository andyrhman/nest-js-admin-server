import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){

    }

    @Get()
    async all(): Promise<User[]>{
        return await this.userService.all();
    }
}