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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const address_service_1 = require("./address.service");
const auth_guard_1 = require("../auth/auth.guard");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("../auth/auth.service");
const class_validator_1 = require("class-validator");
let AddressController = exports.AddressController = class AddressController {
    constructor(addressService, userService, authService) {
        this.addressService = addressService;
        this.userService = userService;
        this.authService = authService;
    }
    async all() {
        return this.addressService.all(['user']);
    }
    async create(request, body) {
        const authUser = await this.authService.userId(request);
        await this.addressService.create({
            street: body.street,
            city: body.city,
            province: body.province,
            zip: body.zip,
            country: body.country,
            phone: body.phone,
            userId: authUser
        });
        return {
            message: "Address created successfully"
        };
    }
    async get(request) {
        const id = await this.authService.userId(request);
        return this.addressService.findOne({ userId: id });
    }
    async update(id, body) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('Invalid UUID format');
        }
        const address = await this.addressService.findOne({ id });
        if (!address) {
            throw new common_1.NotFoundException("Address is not exists");
        }
        await this.addressService.update(id, {
            street: body.street,
            city: body.city,
            province: body.province,
            zip: body.zip,
            country: body.country,
            phone: body.phone,
        });
        return this.addressService.findOne({ id });
    }
    async delete(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('Invalid UUID format');
        }
        await this.addressService.delete(id);
        return {
            message: "Address is deleted successfully"
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "all", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "delete", null);
exports.AddressController = AddressController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('address'),
    __metadata("design:paramtypes", [address_service_1.AddressService,
        user_service_1.UserService,
        auth_service_1.AuthService])
], AddressController);
//# sourceMappingURL=address.controller.js.map