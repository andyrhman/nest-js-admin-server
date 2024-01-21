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
import { UserService } from './user.service';
import { UserCreateDto } from './models/user-create.dto';
import { RoleService } from 'src/role/role.service';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
export declare class UserController {
    private userService;
    private roleService;
    private authService;
    constructor(userService: UserService, roleService: RoleService, authService: AuthService);
    all(page: number, limit: number, search: string): Promise<{
        data: {
            toObject(): any;
            fullName: string;
            username: string;
            email: string;
            created_at: Date;
            role: import("mongoose").Document<unknown, {}, import("../role/models/role.schema").IRole> & import("../role/models/role.schema").IRole & Required<{
                _id: string;
            }>;
            _id: import("mongoose").Types.ObjectId;
        }[];
        meta: import("src/common/paginated.interface").IPaginationMeta;
    }>;
    create(body: UserCreateDto, response: Response): Promise<Response<any, Record<string, any>>>;
    get(id: string): Promise<{
        toObject(): any;
        fullName: string;
        username: string;
        email: string;
        created_at: Date;
        role: import("mongoose").Document<unknown, {}, import("../role/models/role.schema").IRole> & import("../role/models/role.schema").IRole & Required<{
            _id: string;
        }>;
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, body: any, response: Response): Promise<Response<any, Record<string, any>>>;
    delete(id: string, response: Response): Promise<Response<any, Record<string, any>>>;
    updateInfo(request: Request, body: any, response: Response): Promise<Response<any, Record<string, any>>>;
    updatePassword(request: Request, body: any, response: Response): Promise<Response<any, Record<string, any>>>;
}
