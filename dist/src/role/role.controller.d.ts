/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { BadRequestException } from '@nestjs/common';
import { RoleService } from './role.service';
import { Response } from 'express';
import { PermissionService } from 'src/permission/permission.service';
import { RoleDTO } from './dto/role.dto';
export declare class RoleController {
    private roleService;
    private permissionService;
    constructor(roleService: RoleService, permissionService: PermissionService);
    all(): Promise<(import("mongoose").Document<unknown, {}, import("./models/role.schema").IRole> & import("./models/role.schema").IRole & Required<{
        _id: string;
    }>)[]>;
    create(body: RoleDTO): Promise<(import("mongoose").Document<unknown, {}, import("./models/role.schema").IRole> & import("./models/role.schema").IRole & Required<{
        _id: string;
    }>) | BadRequestException>;
    get(id: string): Promise<import("mongoose").Document<unknown, {}, import("./models/role.schema").IRole> & import("./models/role.schema").IRole & Required<{
        _id: string;
    }>>;
    update(id: string, body: RoleDTO, response: Response): Promise<Response<any, Record<string, any>> | BadRequestException>;
    delete(id: string, response: Response): Promise<Response<any, Record<string, any>>>;
}
