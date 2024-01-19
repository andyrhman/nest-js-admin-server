import {
    Controller,
    Get,
    Body,
    Put,
    Delete,
    Param,
    BadRequestException,
    NotFoundException,
    Post,
    Res
}
    from '@nestjs/common';
import { RoleService } from './role.service';
import { HasPermission } from 'src/permission/decorator/permission.decorator';
import { FastifyReply } from 'fastify';
import { isValidObjectId } from 'mongoose';
import { PermissionService } from 'src/permission/permission.service';
import { RoleDTO } from './dto/role.dto';

@Controller('roles')
export class RoleController {
    constructor(
        private roleService: RoleService,
        private permissionService: PermissionService
    ) { }

    // @Get()
    // @HasPermission('roles')
    // async all() {
    //     return this.roleService.all();
    // }

    @Post()
    @HasPermission('roles')
    async create(
        @Body() body: RoleDTO
    ) {
        try {
            // ? Check role if exist
            const permissionValidationPromises = body.permissions.map(permissionId => {
                if (isValidObjectId(permissionId)) { // ? remove isValidObjectId() if your parameter is not ObjectId
                    return this.permissionService.findById(permissionId);
                } else {
                    return null;
                }
            });

            const permissionsExist = await Promise.all(permissionValidationPromises);

            if (permissionsExist.includes(null)) {
                return new BadRequestException("Invalid Request")
            }

            return this.roleService.create({
                name: body.name,
                permissions: body.permissions.map((_id: any) => {
                    return {
                        _id: _id
                    }
                })
            });
        } catch (error) {
            return new BadRequestException(error.message)
        }
    }

    // @Get(':id')
    // @HasPermission('roles')
    // async get(@Param('id') id: number) {

    //     const search = await this.roleService.findOne({ id }, ['permissions']);

    //     if (!search) {
    //         throw new NotFoundException('Role not found');
    //     }

    //     return search;
    // }

    // @Put(':id')
    // @HasPermission('roles')
    // async update(
    //     @Param('id') id: string,
    //     @Body('name') name: string,
    //     @Body('permissions') ids: number[]
    // ) {
    //     await this.roleService.update(id, {name});

    //     const role = await this.roleService.findOne({ id });

    //     return this.roleService.create({
    //         ...role,
    //         permissions: ids.map(id => ({ id }))
    //     });
    // }

    // @Delete(':id')
    // @HasPermission('roles')
    // async delete(
    //     @Param('id') id: string,
    // ) {
    //     await this.roleService.delete(id);

    //     return {
    //         message: "Role deleted sucessfully"
    //     }
    // }
}
