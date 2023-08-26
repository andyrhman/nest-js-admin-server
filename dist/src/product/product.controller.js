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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const auth_guard_1 = require("../auth/auth.guard");
const product_create_dto_1 = require("./models/product-create.dto");
const product_update_dto_1 = require("./models/product-update.dto");
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("../user/user.service");
const order_service_1 = require("../order/order.service");
let ProductController = exports.ProductController = class ProductController {
    constructor(productService, orderService, userService, authService) {
        this.productService = productService;
        this.orderService = orderService;
        this.userService = userService;
        this.authService = authService;
    }
    async all(page = 1) {
        return this.productService.paginate(page);
    }
    async orderProducts(request, orderData) {
        const authUserId = await this.authService.userId(request);
        const user = await this.userService.findOne({ id: authUserId });
        const products = [];
        for (const productData of orderData.products) {
            const product = await this.productService.findOne({ id: productData.id });
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${productData.id} not found`);
            }
            products.push({
                product_title: product.title,
                price: product.price,
                quantity: productData.quantity
            });
        }
        await this.orderService.createOrderItem({
            name: user.username,
            email: user.email,
            products
        });
        return {
            message: "Your order has been created!"
        };
    }
    async create(body) {
        return this.productService.create(body);
    }
    async get(id) {
        return this.productService.findOne({ id });
    }
    async update(id, body) {
        await this.productService.update(id, body);
        return this.productService.findOne({ id });
    }
    async delete(id) {
        return this.productService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "all", null);
__decorate([
    (0, common_1.Post)('order-products'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "orderProducts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_create_dto_1.ProductCreateDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_update_dto_1.ProductUpdateDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        order_service_1.OrderService,
        user_service_1.UserService,
        auth_service_1.AuthService])
], ProductController);
//# sourceMappingURL=product.controller.js.map