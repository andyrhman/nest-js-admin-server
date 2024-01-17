import { Controller, Get, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { HasPermission } from './decorator/permission.decorator';
// import { AuthGuard } from 'src/auth/auth.guard';

// @UseGuards(AuthGuard)
@Controller('permissions')
export class PermissionController {
    // constructor(
    //     private permissinService: PermissionService
    // ){}

    // @Get()
    // async all(){
    //     return this.permissinService.all();
    // }
}
