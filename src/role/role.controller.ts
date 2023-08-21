import { 
    Controller, 
    Get,
    Body,
    Put,
    Delete,
    Param,
    BadRequestException,
    NotFoundException,
    Post
} 
from '@nestjs/common';
import { RoleService } from './role.service';
import { isUUID } from 'class-validator'; // Import class-validator for UUID validation


@Controller('roles')
export class RoleController {
    constructor(
        private roleService: RoleService
    ){}

    @Get()
    async all(){
        return this.roleService.all();
    }

    @Post()
    async create(
        @Body('name') name: string
    ){
        return this.roleService.create({name});
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException('Invalid UUID format');
        }

        const search = await this.roleService.findOne({ id });

        if (!search) {
            throw new NotFoundException('Role not found');
        }

        return search;
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body('name') name: string,
    ) {
        await this.roleService.update(id, {name});

        return this.roleService.findOne({ id });
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
    ) {
        await this.roleService.delete(id);

        return {
            message: "User deleted sucessfully"
        }
    }
}
