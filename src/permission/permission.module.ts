import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { Permission } from './models/permission.schema';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Permission', schema: Permission }]),
    // CommonModule
  ],
  // providers: [PermissionService],
  // controllers: [PermissionController],
  // exports: [PermissionService]
})
export class PermissionModule {}
