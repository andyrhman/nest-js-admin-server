"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const paginate = async (model, page = 1, limit = 10, query = {}, sort = {}) => {
    const skip = (page - 1) * limit;
    const countPromise = model.countDocuments(query).exec();
    const findPromise = model.find(query).sort(sort).skip(skip).limit(limit).exec();
    const [total, results] = await Promise.all([countPromise, findPromise]);
    return {
        data: results,
        meta: {
            total,
            page,
            pageSize: limit,
            last_page: Math.ceil(total / limit),
        }
    };
};
exports.paginate = paginate;
//# sourceMappingURL=pagination.utility.js.map