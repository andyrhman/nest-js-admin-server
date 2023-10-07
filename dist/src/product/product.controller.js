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
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("../user/user.service");
const order_service_1 = require("../order/order.service");
const Joi = require("joi");
const productCreate = Joi.object({
    title: Joi.string().required().error(() => {
        return new Error("Title is required");
    }),
    description: Joi.string().required().error(() => {
        return new Error("Description is required");
    }),
    image: Joi.string().required().error(() => {
        return new Error("Image is required");
    }),
    price: Joi.number().required().error(() => {
        return new Error("Price is required");
    }),
    images: Joi.array().items(Joi.string().required().messages({
        'string.empty': `"Images" is required`
    })).min(1).error(() => {
        return new Error("Images must have at least one item");
    })
});
const productUpdate = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number(),
    images: Joi.array().items(Joi.string().required().messages({
        'string.empty': `"Images" is required`
    })).min(1).error(() => {
        return new Error("Images must have at least one item");
    })
});
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
    async show(request) {
        let products = await this.productService.all(['product_images']);
        if (request.query.search) {
            const search = request.query.search.toString().toLowerCase();
            products = products.filter(p => p.title.toLowerCase().indexOf(search) >= 0 ||
                p.description.toLowerCase().indexOf(search) >= 0);
        }
        if (request.query.sort) {
            if (request.query.sort === 'asc' || request.query.sort === 'desc') {
                products.sort((a, b) => {
                    const diff = a.price - b.price;
                    if (diff === 0)
                        return 0;
                    const sign = Math.abs(diff) / diff;
                    return request.query.sort === 'asc' ? -sign : sign;
                });
            }
            else if (request.query.sort === 'newest' || request.query.sort === 'oldest') {
                products.sort((a, b) => {
                    if (request.query.sort === 'newest') {
                        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                    }
                    else {
                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                    }
                });
            }
        }
        const page = parseInt(request.query.page) || 1;
        const perPage = 9;
        const total = products.length;
        const data = products.slice((page - 1) * perPage, page * perPage);
        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / perPage)
        };
    }
    async findUsers(search, page = 1) {
        if (/[<>]/.test(search)) {
            throw new common_1.BadRequestException("Invalid product input");
        }
        const products = await this.productService.findProducts(search, page);
        if (products.length === 0) {
            throw new common_1.NotFoundException(`Can't find any results for your search: ${search}`);
        }
        return products;
    }
    async test(request, body) {
        const { id, quantity } = body;
        if (!quantity) {
            throw new common_1.BadRequestException("Please insert quantity");
        }
        const userId = await this.authService.userId(request);
        const user = await this.userService.findOne({ id: userId });
        const productData = await this.productService.findOne({ id: id });
        const exstingOrder = await this.orderService.findOne({ userId: userId });
        if (exstingOrder) {
            await this.orderService.createOrderItem({
                product_title: productData.title,
                price: productData.price,
                quantity: quantity,
                order: exstingOrder.id,
                product_id: productData.id
            });
        }
        else if (!exstingOrder) {
            await this.orderService.createOrders({
                name: user.username,
                email: user.email,
                userId: userId,
                product_title: productData.title,
                price: productData.price,
                quantity: quantity,
                product_id: productData.id
            });
        }
        return {
            message: "Your order has been created!"
        };
    }
    async create(body) {
        const { error } = productCreate.validate(body);
        if (error) {
            throw new common_1.BadRequestException(error.message);
        }
        return this.productService.createImages(body);
    }
    async get(slug) {
        return this.productService.findOne({ slug }, ['product_images']);
    }
    async update(id, body) {
        const findImages = await this.productService.findProductImages({ productId: id });
        if (findImages) {
            await this.productService.deleteImages(findImages.productId);
        }
        const { error } = productUpdate.validate(body);
        if (error) {
            throw new common_1.BadRequestException(error.message);
        }
        await this.productService.update(id, body);
        return this.productService.findOne({ id });
    }
    async delete(id) {
        const findImages = [await this.productService.findProductImages({ productId: id })];
        for (const image of findImages) {
            await this.productService.deleteImages(image.productId);
        }
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
    (0, common_1.Get)('show'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "show", null);
__decorate([
    (0, common_1.Get)('product'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findUsers", null);
__decorate([
    (0, common_1.Post)('order-products'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "test", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        order_service_1.OrderService,
        user_service_1.UserService,
        auth_service_1.AuthService])
], ProductController);
//# sourceMappingURL=product.controller.js.map