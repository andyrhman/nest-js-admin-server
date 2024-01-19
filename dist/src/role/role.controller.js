"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const permission_decorator_1 = require("../permission/decorator/permission.decorator");
const mongoose_1 = require("mongoose");
const permission_service_1 = require("../permission/permission.service");
const role_dto_1 = require("./dto/role.dto");
let RoleController = exports.RoleController = class RoleController {
    constructor(roleService, permissionService) {
        this.roleService = roleService;
        this.permissionService = permissionService;
    }
    async all() {
        return this.roleService.findAllRoles();
    }
    async create(body) {
        const permissionValidationPromises = body.permissions.map(permissionId => {
            if ((0, mongoose_1.isValidObjectId)(permissionId)) {
                return this.permissionService.findById(permissionId);
            }
            else {
                return null;
            }
        });
        const permissionsExist = await Promise.all(permissionValidationPromises);
        if (permissionsExist.includes(null)) {
            return new common_1.BadRequestException("Invalid Request");
        }
        return this.roleService.create({
            name: body.name,
            permissions: body.permissions.map((_id) => {
                return {
                    _id: _id
                };
            })
        });
    }
    async get(id) {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Invalid Request');
        }
        const search = await this.roleService.findRolesAndPopulate(id);
        if (!search) {
            throw new common_1.NotFoundException('Role not found');
        }
        return search;
    }
    async update(id, body, response) {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Invalid Request');
        }
        const permissionValidationPromises = body.permissions.map(permissionId => {
            if ((0, mongoose_1.isValidObjectId)(permissionId)) {
                return this.permissionService.findById(permissionId);
            }
            else {
                return null;
            }
        });
        const permissionsExist = await Promise.all(permissionValidationPromises);
        if (permissionsExist.includes(null)) {
            return new common_1.BadRequestException("Invalid Request");
        }
        const updatedRole = await this.roleService.findOneAndUpdate({ _id: id }, {
            name: body.name,
            permissions: body.permissions.map((_id) => {
                return {
                    _id: _id
                };
            })
        });
        if (!updatedRole) {
            throw new common_1.NotFoundException('Role not found');
        }
        return response.status(202).send(updatedRole);
    }
    async delete(id, response) {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Invalid Request');
        }
        await this.roleService.delete(id);
        return response.status(204).send(null);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, permission_decorator_1.HasPermission)('roles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "all", null);
__decorate([
    (0, common_1.Post)(),
    (0, permission_decorator_1.HasPermission)('roles'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDTO]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permission_decorator_1.HasPermission)('roles'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, permission_decorator_1.HasPermission)('roles'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, role_dto_1.RoleDTO, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permission_decorator_1.HasPermission)('roles'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "delete", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [role_service_1.RoleService,
        permission_service_1.PermissionService])
], RoleController);
//# sourceMappingURL=role.controller.js.map