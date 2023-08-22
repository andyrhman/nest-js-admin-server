import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './models/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
  ],
  providers: [PermissionService],
  controllers: [PermissionController],
  exports: [PermissionService]
})
export class PermissionModule {}
