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
let RoleController = exports.RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async all() {
        return this.roleService.all();
    }
    async create(name, ids) {
        return this.roleService.create({
            name,
            permissions: ids.map(id => ({ id }))
        });
    }
    async get(id) {
        const search = await this.roleService.findOne({ id }, ['permissions']);
        if (!search) {
            throw new common_1.NotFoundException('Role not found');
        }
        return search;
    }
    async update(id, name, ids) {
        await this.roleService.update(id, { name });
        const role = await this.roleService.findOne({ id });
        return this.roleService.create({
            ...role,
            permissions: ids.map(id => ({ id }))
        });
    }
    async delete(id) {
        await this.roleService.delete(id);
        return {
            message: "Role deleted sucessfully"
        };
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
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('permissions')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permission_decorator_1.HasPermission)('roles'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, permission_decorator_1.HasPermission)('roles'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Body)('permissions')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permission_decorator_1.HasPermission)('roles'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "delete", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
//# sourceMappingURL=role.controller.js.map