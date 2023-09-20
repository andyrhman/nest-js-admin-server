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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const abstract_service_1 = require("../common/abstract.service");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./models/product.entity");
const product_images_entity_1 = require("./models/product-images.entity");
const slugify_1 = require("slugify");
let ProductService = exports.ProductService = class ProductService extends abstract_service_1.AbstractService {
    constructor(productRepository, productImagesRepository) {
        super(productRepository);
        this.productRepository = productRepository;
        this.productImagesRepository = productImagesRepository;
    }
    async findProductImages(options) {
        return this.productImagesRepository.findOne({ where: options });
    }
    async deleteImages(productId) {
        return this.productImagesRepository.delete({ productId });
    }
    async createImages(data) {
        const product = new product_entity_1.Product();
        product.title = data.title;
        product.slug = (0, slugify_1.default)(data.title, {
            lower: true,
            strict: true,
            trim: true
        });
        product.description = data.description;
        product.image = data.image;
        product.price = data.price;
        await this.productRepository.save(product);
        if (Array.isArray(data.images)) {
            for (const imageUrl of data.images) {
                const productImage = new product_images_entity_1.ProductImages();
                productImage.productId = product.id;
                productImage.image = imageUrl;
                await this.productImagesRepository.save(productImage);
            }
        }
        else {
            throw new common_1.BadRequestException("Images field is required and it should be an array");
        }
        return product;
    }
    async update(id, body) {
        const product = new product_entity_1.Product();
        product.title = body.title;
        product.slug = (0, slugify_1.default)(body.title, {
            lower: true,
            strict: true,
            trim: true
        });
        product.description = body.description;
        product.image = body.image;
        product.price = body.price;
        await this.productRepository.update(id, product);
        if (Array.isArray(body.images)) {
            for (const imageUrl of body.images) {
                const productImage = new product_images_entity_1.ProductImages();
                productImage.productId = id;
                productImage.image = imageUrl;
                await this.productImagesRepository.save(productImage);
            }
        }
        else {
            throw new common_1.BadRequestException("Images field is required and it should be an array");
        }
        return product;
    }
    async findProducts(search, page = 1) {
        const take = 12;
        const [products, total] = await this.productRepository
            .createQueryBuilder('product')
            .where('product.title ILIKE :search OR product.description ILIKE :search', { search: `%${search}%` })
            .skip((page - 1) * take)
            .take(take)
            .getManyAndCount();
        return {
            data: products,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        };
    }
};
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(product_images_entity_1.ProductImages)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map