"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./models/product.entity");
const upload_controller_1 = require("./upload.controller");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../user/user.module");
const order_module_1 = require("../order/order.module");
const product_images_entity_1 = require("./models/product-images.entity");
let ProductModule = exports.ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, product_images_entity_1.ProductImages]),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            order_module_1.OrderModule
        ],
        providers: [product_service_1.ProductService],
        controllers: [product_controller_1.ProductController, upload_controller_1.UploadController]
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map