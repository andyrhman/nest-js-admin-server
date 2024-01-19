"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
class AbstractService {
    constructor(model) {
        this.model = model;
    }
    async all() {
        return this.model.find().exec();
    }
    async create(data) {
        const created = new this.model(data);
        return created.save();
    }
    async save(data) {
        const created = new this.model(data);
        return created.save();
    }
    async seed(data) {
        const created = new this.model(data);
        return created.save();
    }
    async update(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
    async findOne(options) {
        return this.model.findOne(options).exec();
    }
    async findById(id) {
        return this.model.findById(id).exec();
    }
    async findByEmail(email) {
        return this.model.findOne({ email }).exec();
    }
    async findByUsername(username) {
        return this.model.findOne({ username }).exec();
    }
    async findByUsernameOrEmail(username, email) {
        return this.model.findOne({
            $or: [{ username }, { email }],
        }).exec();
    }
    async paginate(paginationOptions) {
        const { page, limit } = paginationOptions;
        const skip = (page - 1) * limit;
        const total = await this.model.countDocuments().exec();
        const data = await this.model.find().limit(limit).skip(skip).exec();
        const last_page = Math.ceil(total / limit);
        return {
            data,
            meta: {
                total,
                page,
                last_page,
            },
        };
    }
}
exports.AbstractService = AbstractService;
//# sourceMappingURL=abstract.service.js.map