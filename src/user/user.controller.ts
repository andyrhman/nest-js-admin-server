import { 
    BadRequestException, 
    Body, 
    Controller, 
    Get, 
    Post, 
    UseInterceptors, 
    ClassSerializerInterceptor, 
    UseGuards, 
    Param,
    NotFoundException
} 
from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.entity';
import * as argon2 from 'argon2';
import { UserDto } from './models/user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { isUUID } from 'class-validator'; // Import class-validator for UUID validation

@UseInterceptors(ClassSerializerInterceptor) // hide the password
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService){

    }

    @Get()
    async all(): Promise<User[]>{
        return await this.userService.all();
    }

    @Post()
    async create(@Body() body: UserDto): Promise<User> {
        const password = await argon2.hash('123456')

        // Check if the username or email already exists
        const existingUser = await this.userService.findByUsernameOrEmail(
            body.username,
            body.email,
        );

        if (existingUser) {
            throw new BadRequestException('Username or email already exists');
        }

        return this.userService.create({
            username: body.username,
            email: body.email,
            password
        });
    }

    @Get(':id')
    async get(@Param('id') id: string) {
      if (!isUUID(id)) {
        throw new BadRequestException('Invalid UUID format');
      }
  
      const search = await this.userService.findOne({ id });
  
      if (!search) {
        throw new NotFoundException('User not found');
      }
  
      return search;
    }
}
