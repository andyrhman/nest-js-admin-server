import { Controller, Get, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { HasPermission } from './decorator/permission.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('permissions')
export class PermissionController {
    constructor(
        private permissionService: PermissionService
    ) { }

    @Get()
    @UseGuards(AuthGuard)
    @HasPermission('roles')
    async all() {
        return this.permissionService.all();
    }
}
