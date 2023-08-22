import { PermissionService } from './permission.service';
export declare class PermissionController {
    private permissinService;
    constructor(permissinService: PermissionService);
    all(): Promise<any[]>;
}
