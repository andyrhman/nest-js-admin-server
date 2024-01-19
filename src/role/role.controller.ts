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
import { isValidObjectId } from 'mongoose';
import { FastifyReply } from 'fastify';
import { PermissionService } from 'src/permission/permission.service';
import { RoleDTO } from './dto/role.dto';

@Controller('roles')
export class RoleController {
    constructor(
        private roleService: RoleService,
        private permissionService: PermissionService
    ) { }

    @Get()
    @HasPermission('roles')
    async all() {
        return this.roleService.findAllRoles();
    }

    @Post()
    @HasPermission('roles')
    async create(
        @Body() body: RoleDTO
    ) {
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
    }

    @Get(':id')
    @HasPermission('roles')
    async get(
        @Param('id') id: string
    ) {

        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid Request');
        }

        const search = await this.roleService.findRolesAndPopulate(id);

        if (!search) {
            throw new NotFoundException('Role not found');
        }

        return search;
    }

    @Put(':id')
    @HasPermission('roles')
    async update(
        @Param('id') id: string,
        @Body() body: RoleDTO,
        @Res({ passthrough: true }) response: FastifyReply
    ) {
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid Request');
        }

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

        const updatedRole = await this.roleService.findOneAndUpdate(
            { _id: id }, // Use the role ID from the request parameters
            {
                name: body.name,
                permissions: body.permissions.map((_id: any) => {
                    return {
                        _id: _id
                    }
                })
            } // Return the updated document and overwrite it
        );

        if (!updatedRole) {
            throw new NotFoundException('Role not found');
        }

        return response.status(202).send(updatedRole);
    }

    @Delete(':id')
    @HasPermission('roles')
    async delete(
        @Param('id') id: string,
        @Res({ passthrough: true }) response: FastifyReply
    ) {
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid Request');
        }

        await this.roleService.delete(id);

        return response.status(204).send(null);
    }
}
