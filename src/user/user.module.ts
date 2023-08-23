import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { CommonModule } from 'src/common/common.module';
import { RoleModule } from 'src/role/role.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CommonModule,
    RoleModule,
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
