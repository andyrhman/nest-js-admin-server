import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserSchema } from './models/user.schema';
import { UserService } from './user.service';
import { CommonModule } from 'src/common/common.module';
import { RoleModule } from 'src/role/role.module';
// import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    // CommonModule,
    // RoleModule,
    // AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
