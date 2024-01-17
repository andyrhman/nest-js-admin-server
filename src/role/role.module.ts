import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Role } from './models/role.schema';
import { PermissionModule } from 'src/permission/permission.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Role', schema: Role }]),
    // PermissionModule
  ],
  // controllers: [RoleController],
  // providers: [RoleService],
  // exports: [RoleService]
})
export class RoleModule {}
