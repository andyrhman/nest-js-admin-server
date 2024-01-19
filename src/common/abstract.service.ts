import { HydratedDocument, Model } from "mongoose";
import { IPaginationOptions, IPaginationResult } from "./paginated.interface";

export abstract class AbstractService<T extends HydratedDocument<any>> {
    protected model: Model<T>;

    protected constructor(model: Model<T>) {
        this.model = model;
    }

    async all(): Promise<T[]> {
        return this.model.find().exec();
    }

    async create(data: object): Promise<T> {
        const created = new this.model(data);
        return created.save();
    }

    async save(data: Partial<T>): Promise<T> {
        const created = new this.model(data);
        return created.save();
    }

    async seed(data: object): Promise<T> {
        const created = new this.model(data);
        return created.save();
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async findOneAndUpdate(id: any, data: any): Promise<T | null> {
        return this.model.findOneAndUpdate(id, data, { new: true, overwrite: true }).exec();
    }

    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    async findOne(options: object): Promise<T | null> {
        return this.model.findOne(options).exec();
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async findByEmail(email: string): Promise<T | null> {
        return this.model.findOne({ email }).exec();
    }

    async findByUsername(username: string): Promise<T | null> {
        return this.model.findOne({ username }).exec();
    }

    async findByUsernameOrEmail(username: string, email: string): Promise<T | null> {
        return this.model.findOne({
            $or: [{ username }, { email }],
        }).exec();
    }

    async paginate(paginationOptions: IPaginationOptions): Promise<IPaginationResult<T>> {
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