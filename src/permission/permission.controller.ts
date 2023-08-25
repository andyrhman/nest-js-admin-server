import { Controller, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { HasPermission } from './decorator/permission.decorator';

@Controller('permissions')
export class PermissionController {
    constructor(
        private permissinService: PermissionService
    ){}

    @Get()
    @HasPermission('view_permissions')
    async all(){
        return this.permissinService.all();
    }
}
