"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("../config/config.module");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const common_module_1 = require("./common/common.module");
const role_module_1 = require("./role/role.module");
const permission_module_1 = require("./permission/permission.module");
const product_module_1 = require("./product/product.module");
const order_module_1 = require("./order/order.module");
const core_1 = require("@nestjs/core");
const permission_guard_1 = require("./permission/permission.guard");
const address_module_1 = require("./address/address.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            config_module_1.ConfigurationModule,
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT, 10),
                username: 'postgres',
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DATABASE,
                autoLoadEntities: true,
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            common_module_1.CommonModule,
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            product_module_1.ProductModule,
            order_module_1.OrderModule,
            address_module_1.AddressModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: permission_guard_1.PermissionGuard
            }
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map