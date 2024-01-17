import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './models/role.schema';
import { Repository } from 'typeorm';
// import { AbstractService } from 'src/common/abstract.service';

@Injectable()
export class RoleService {
    // constructor(
    //     @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    // ) {
    //     super(roleRepository);
    // }

    // // Find all user in the DB
    // async all(relations = []): Promise<any[]> {
    //     return await this.repository.find({relations, order: {id: "DESC"}});
    // }    
}
