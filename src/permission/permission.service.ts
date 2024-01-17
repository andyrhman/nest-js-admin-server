import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './models/permission.schema';
import { Repository } from 'typeorm';
// import { AbstractService } from 'src/common/abstract.service';

@Injectable()
export class PermissionService{
    // constructor(
    //     @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>
    // ) { 
    //     super(permissionRepository);
    // }
}
