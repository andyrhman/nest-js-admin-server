import { Controller, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
    constructor(
        private permissinService: PermissionService
    ){}

    @Get()
    async all(){
        return this.permissinService.all();
    }
}
