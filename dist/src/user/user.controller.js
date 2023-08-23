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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const argon2 = require("argon2");
const user_create_dto_1 = require("./models/user-create.dto");
const auth_guard_1 = require("../auth/auth.guard");
const class_validator_1 = require("class-validator");
const role_service_1 = require("../role/role.service");
const auth_service_1 = require("../auth/auth.service");
let UserController = exports.UserController = class UserController {
    constructor(userService, roleService, authService) {
        this.userService = userService;
        this.roleService = roleService;
        this.authService = authService;
    }
    async all(page = 1) {
        return await this.userService.paginate(page, ['role']);
    }
    async create(body) {
        const password = await argon2.hash('123456');
        const existingUser = await this.userService.findByUsernameOrEmail(body.username, body.email);
        if (existingUser) {
            throw new common_1.BadRequestException('Username or email already exists');
        }
        return this.userService.create({
            username: body.username,
            email: body.email,
            password,
            role: { id: body.role_id }
        });
    }
    async get(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('Invalid UUID format');
        }
        const search = await this.userService.findOne({ id }, ['role']);
        if (!search) {
            throw new common_1.NotFoundException('User not found');
        }
        return search;
    }
    async updateInfo(request, body) {
        const id = await this.authService.userId(request);
        const existingUser = await this.userService.findOne({ id });
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found');
        }
        if (body.email && body.email !== existingUser.email) {
            const existingUserByEmail = await this.userService.findByEmail(body.email);
            if (existingUserByEmail) {
                throw new common_1.ConflictException('Email already exists');
            }
            existingUser.email = body.email;
        }
        if (body.username && body.username !== existingUser.username) {
            const existingUserByUsername = await this.userService.findByUsername(body.username);
            if (existingUserByUsername) {
                throw new common_1.ConflictException('Username already exists');
            }
            existingUser.username = body.username;
        }
        await this.userService.update(id, existingUser);
        return this.userService.findOne({ id });
    }
    async updatePassword(request, body) {
        if (body.password !== body.confirm_password) {
            throw new common_1.BadRequestException("Password do not match.");
        }
        const id = await this.authService.userId(request);
        const hashPassword = await argon2.hash(body.password);
        await this.userService.update(id, {
            password: hashPassword
        });
        return this.userService.findOne({ id });
    }
    async update(id, body) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('Invalid UUID format');
        }
        const existingUser = await this.userService.findOne({ id });
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const { username, email, role_id } = body;
        if (username && username !== existingUser.username) {
            const existingUsername = await this.userService.findByUsername(username);
            if (existingUsername) {
                throw new common_1.BadRequestException('Username already exists');
            }
            existingUser.username = username;
        }
        if (email && email !== existingUser.email) {
            const existingEmail = await this.userService.findByEmail(email);
            if (existingEmail) {
                throw new common_1.BadRequestException('Email already exists');
            }
            existingUser.email = email;
        }
        if (role_id) {
            const role = await this.roleService.findOne({ id: role_id });
            if (!role) {
                throw new common_1.NotFoundException('Role not found');
            }
            existingUser.role = role;
        }
        await this.userService.update(id, existingUser);
        return this.userService.findOne({ id });
    }
    async delete(id) {
        await this.userService.delete(id);
        return {
            message: "User deleted sucessfully"
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "all", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_create_dto_1.UserCreateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    (0, common_1.Put)('info'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateInfo", null);
__decorate([
    (0, common_1.Put)('password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        role_service_1.RoleService,
        auth_service_1.AuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map