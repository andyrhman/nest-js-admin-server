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
const mongoose_1 = require("mongoose");
const role_service_1 = require("../role/role.service");
const auth_service_1 = require("../auth/auth.service");
const permission_decorator_1 = require("../permission/decorator/permission.decorator");
const sanitizeHtml = require("sanitize-html");
let UserController = exports.UserController = class UserController {
    constructor(userService, roleService, authService) {
        this.userService = userService;
        this.roleService = roleService;
        this.authService = authService;
    }
    async all(page, limit, search) {
        const options = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
        };
        let result = await this.userService.paginate(options);
        if (typeof search === 'string') {
            search = sanitizeHtml(search);
            if (search) {
                const search2 = search.toString().toLowerCase();
                result.data = result.data.filter(p => p.username.toLowerCase().indexOf(search2) >= 0 ||
                    p.email.toLowerCase().indexOf(search2) >= 0);
                if (result.data.length === 0) {
                    throw new common_1.NotFoundException(`Not found search name '${search}'`);
                }
            }
        }
        const responseData = result.data.map(u => {
            const { password, ...data } = u.toObject();
            return data;
        });
        return {
            data: responseData,
            meta: result.meta
        };
    }
    async create(body, response) {
        const hashedPassword = await argon2.hash('123456');
        const emailExists = await this.userService.findOne({ email: body.email.toLowerCase() });
        const usernameExists = await this.userService.findOne({ username: body.username.toLowerCase() });
        if (emailExists || usernameExists) {
            throw new common_1.BadRequestException('Email or username already exists');
        }
        const user = await this.userService.create({
            fullName: body.fullname,
            username: body.username,
            email: body.email,
            password: hashedPassword,
            role: "65aa17c1770eddfccc012cf8"
        });
        const { password, ...data } = user.toObject();
        return response.status(201).send(data);
    }
    async get(id) {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Invalid Request');
        }
        const search = await this.userService.findById(id);
        if (!search) {
            throw new common_1.NotFoundException('User not found');
        }
        const { password, ...data } = search.toObject();
        return data;
    }
    async update(id, body, response) {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Invalid Request');
        }
        const existingUser = await this.userService.findById(id);
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
            const role = await this.roleService.findById(id);
            if (!role) {
                throw new common_1.NotFoundException('Role not found');
            }
            existingUser.role = role;
        }
        const { password, ...user } = (await this.userService.update(id, existingUser)).toObject();
        return response.status(202).send(user);
    }
    async delete(id, response) {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Invalid Request');
        }
        await this.userService.delete(id);
        return response.status(204).send(null);
    }
    async updateInfo(request, body, response) {
        const id = await this.authService.userId(request);
        const existingUser = await this.userService.findById(id);
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
        const { password, ...user } = (await this.userService.update(id, existingUser)).toObject();
        return response.status(202).send(user);
    }
    async updatePassword(request, body, response) {
        if (body.password !== body.confirm_password) {
            throw new common_1.BadRequestException("Password do not match.");
        }
        const id = await this.authService.userId(request);
        const hashPassword = await argon2.hash(body.password);
        const { password, ...user } = (await this.userService.update(id, {
            password: hashPassword
        })).toObject();
        return response.status(202).send(user);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, permission_decorator_1.HasPermission)('users'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "all", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, permission_decorator_1.HasPermission)('users'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_create_dto_1.UserCreateDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, permission_decorator_1.HasPermission)('users'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, permission_decorator_1.HasPermission)('users'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, permission_decorator_1.HasPermission)('users'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)('info'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateInfo", null);
__decorate([
    (0, common_1.Put)('password'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        role_service_1.RoleService,
        auth_service_1.AuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map