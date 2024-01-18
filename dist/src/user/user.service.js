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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const abstract_service_1 = require("../common/abstract.service");
let UserService = exports.UserService = class UserService extends abstract_service_1.AbstractService {
    constructor(userModel) {
        super(userModel);
        this.userModel = userModel;
    }
    async create(data) {
        const newUser = new this.userModel(data);
        return newUser.save();
    }
    async find() {
        return this.userModel.find().exec();
    }
    async findOne(options) {
        return this.userModel.findOne(options).exec();
    }
    async findById(id) {
        return this.userModel.findById(id).exec();
    }
    async update(id, updateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }
    async delete(id) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
    async findAll(page = 1, limit = 1) {
        const skip = (page - 1) * limit;
        const total = await this.userModel.countDocuments().exec();
        const data = await this.userModel.find().limit(limit).skip(skip).exec();
        const last_page = Math.ceil(total / limit);
        return {
            data,
            total,
            page,
            last_page,
        };
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map