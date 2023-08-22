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

@Controller('roles')
export class RoleController {
    constructor(
        private roleService: RoleService
    ) { }

    @Get()
    async all() {
        return this.roleService.all();
    }

    @Post()
    async create(
        @Body('name') name: string,
        @Body('permissions') ids: number[]
    ) {
        /*
            [1, 2]

            [
                {id: 1}, {id: 2}
            ]
        */
        return this.roleService.create({
            name,
            permissions: ids.map(id => ({ id }))
        });
    }

    @Get(':id')
    async get(@Param('id') id: number) {

        const search = await this.roleService.findOne({ id });

        if (!search) {
            throw new NotFoundException('Role not found');
        }

        return search;
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('name') name: string,
        @Body('permissions') ids: number[]
    ) {
        const role = await this.roleService.findOne({ id });

        await this.roleService.update(id, {name});
        
        return this.roleService.create({
            ...role,
            permissions: ids.map(id => ({ id }))
        });
    }

    @Delete(':id')
    async delete(
        @Param('id') id: number,
    ) {
        await this.roleService.delete(id);

        return {
            message: "User deleted sucessfully"
        }
    }
}
