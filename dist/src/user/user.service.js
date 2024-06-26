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
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./models/user.entity");
const typeorm_2 = require("typeorm");
const abstract_service_1 = require("../common/abstract.service");
let UserService = exports.UserService = class UserService extends abstract_service_1.AbstractService {
    constructor(userRepository) {
        super(userRepository);
        this.userRepository = userRepository;
    }
    async paginate(page = 1, relations = []) {
        const take = 1;
        const [users, total] = await this.userRepository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations
        });
        return {
            data: users.map(user => {
                const { password, ...data } = user;
                return data;
            }),
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        };
    }
    async findUsersByUsernameOrEmail(search, page = 1) {
        const take = 1;
        const [users, total] = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .where('user.username ILIKE :search OR user.email ILIKE :search', { search: `%${search}%` })
            .skip((page - 1) * take)
            .take(take)
            .getManyAndCount();
        return {
            data: users.map(user => {
                const { password, ...data } = user;
                return data;
            }),
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        };
    }
    async findUsersRegister(search) {
        return this.userRepository
            .createQueryBuilder('user')
            .where('user.username ILIKE :search OR user.email ILIKE :search', { search: `%${search}%` })
            .getMany();
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map