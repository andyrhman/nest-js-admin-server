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
const user_update_dto_1 = require("./models/user-update.dto");
const auth_guard_1 = require("../auth/auth.guard");
const class_validator_1 = require("class-validator");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async all(page = 1) {
        return await this.userService.paginate(page);
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
            password
        });
    }
    async get(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('Invalid UUID format');
        }
        const search = await this.userService.findOne({ id });
        if (!search) {
            throw new common_1.NotFoundException('User not found');
        }
        return search;
    }
    async update(id, body) {
        const existingUsername = await this.userService.findByUsername(body.username);
        if (existingUsername) {
            throw new common_1.BadRequestException('Username already exists');
        }
        const existingEmail = await this.userService.findByEmail(body.email);
        if (existingEmail) {
            throw new common_1.BadRequestException('Email already exists');
        }
        await this.userService.update(id, body);
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
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_update_dto_1.UserUpdateDto]),
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
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map