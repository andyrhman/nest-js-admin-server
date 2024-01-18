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
const sanitizeHtml = require("sanitize-html");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
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
        });
        const { password, ...data } = user.toObject();
        response.status(201);
        return data;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "all", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_create_dto_1.UserCreateDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map