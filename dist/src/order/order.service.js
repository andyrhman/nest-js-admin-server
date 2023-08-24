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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const abstract_service_1 = require("../common/abstract.service");
const order_entity_1 = require("./models/order.entity");
const typeorm_2 = require("typeorm");
const order_item_entity_1 = require("./models/order-item.entity");
let OrderService = exports.OrderService = class OrderService extends abstract_service_1.AbstractService {
    constructor(orderRepository, orderItemRepository) {
        super(orderRepository);
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }
    async paginate(page = 1, relations = []) {
        const { data, meta } = await super.paginate(page, relations);
        return {
            data: data.map((order) => ({
                id: order.id,
                name: order.name,
                email: order.email,
                total: order.total,
                created_at: order.created_at,
                order_items: order.order_items
            })),
            meta
        };
    }
    async seed() {
        const order = new order_entity_1.Order();
        order.name = 'John Doe';
        order.email = 'john@example.com';
        await this.orderRepository.save(order);
        const orderItem1 = new order_item_entity_1.OrderItem();
        orderItem1.product_title = 'Product 1';
        orderItem1.price = 100;
        orderItem1.quantity = 2;
        orderItem1.order = order;
        await this.orderItemRepository.save(orderItem1);
        const orderItem2 = new order_item_entity_1.OrderItem();
        orderItem2.product_title = 'Product 2';
        orderItem2.price = 100;
        orderItem2.quantity = 3;
        orderItem2.order = order;
        await this.orderItemRepository.save(orderItem2);
    }
};
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map