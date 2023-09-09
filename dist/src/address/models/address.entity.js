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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const user_entity_1 = require("../../user/models/user.entity");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let Address = exports.Address = class Address {
    addId() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Address.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "zip", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Address.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], Address.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Address.prototype, "addId", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.address),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Address.prototype, "user", void 0);
exports.Address = Address = __decorate([
    (0, typeorm_1.Entity)('address')
], Address);
//# sourceMappingURL=address.entity.js.map