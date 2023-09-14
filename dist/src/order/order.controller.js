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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const auth_guard_1 = require("../auth/auth.guard");
const json2csv_1 = require("json2csv");
const order_item_entity_1 = require("./models/order-item.entity");
const permission_decorator_1 = require("../permission/decorator/permission.decorator");
let OrderController = exports.OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async all(page = 1) {
        return this.orderService.paginate(page, ['order_items']);
    }
    async allOrderItem() {
        return this.orderService.allOrderItem();
    }
    async status(id, body) {
        if (body.status && !Object.values(order_item_entity_1.OrderItemStatus).includes(body.status)) {
            throw new common_1.BadRequestException('Invalid status');
        }
        await this.orderService.updateStatus(id, {
            status: body.status
        });
        return {
            message: "Updated successfully"
        };
    }
    async get(id) {
        return this.orderService.findOneOrderItem({ id });
    }
    async findUsers(search, page = 1) {
        if (/[<>]/.test(search)) {
            throw new common_1.BadRequestException("Invalid user input");
        }
        const orders = await this.orderService.findOrder(search, page);
        if (orders.length === 0) {
            throw new common_1.NotFoundException(`Can't find any results for your search: ${search}`);
        }
        return orders;
    }
    async export(res) {
        const parser = new json2csv_1.Parser({
            fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
        });
        const orders = await this.orderService.all(['order_items']);
        const json = [];
        orders.forEach((o) => {
            o.order_items.forEach((i) => {
                json.push({
                    ID: o.id,
                    Name: o.name,
                    Email: o.email,
                    'Product Title': i.product_title,
                    Price: i.price,
                    Quantity: i.quantity
                });
            });
        });
        const csv = parser.parse(json);
        res.header('Content-Type', 'text/csv');
        res.attachment('orders.csv');
        res.send(csv);
    }
    async orders() {
        return this.orderService.chart();
    }
};
__decorate([
    (0, common_1.Get)('orders'),
    (0, permission_decorator_1.HasPermission)('orders'),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('order-item'),
    (0, permission_decorator_1.HasPermission)('orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "allOrderItem", null);
__decorate([
    (0, common_1.Put)('/orders/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "status", null);
__decorate([
    (0, common_1.Get)('/orders/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('order'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findUsers", null);
__decorate([
    (0, common_1.Post)('export'),
    (0, permission_decorator_1.HasPermission)('orders'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "export", null);
__decorate([
    (0, common_1.Get)('chart'),
    (0, permission_decorator_1.HasPermission)('orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "orders", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map