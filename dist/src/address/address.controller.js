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
let AddressController = exports.AddressController = class AddressController {
    constructor(addressService, userService, authService) {
        this.addressService = addressService;
        this.userService = userService;
        this.authService = authService;
    }
    async create(request, body) {
        const authUser = await this.authService.userId(request);
        const user = await this.userService.findOne({ id: authUser });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.addressService.createAddress({
            street: body.street,
            city: body.city,
            province: body.province,
            zip: body.zip,
            country: body.country,
            phone: body.phone,
            user: user
        });
    }
};
__decorate([
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "create", null);
exports.AddressController = AddressController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('address'),
    __metadata("design:paramtypes", [address_service_1.AddressService,
        user_service_1.UserService,
        auth_service_1.AuthService])
], AddressController);
//# sourceMappingURL=address.controller.js.map