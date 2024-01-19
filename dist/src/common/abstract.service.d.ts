import { HydratedDocument, Model } from "mongoose";
import { IPaginationOptions, IPaginationResult } from "./paginated.interface";
export declare abstract class AbstractService<T extends HydratedDocument<any>> {
    protected model: Model<T>;
    protected constructor(model: Model<T>);
    all(): Promise<T[]>;
    create(data: object): Promise<T>;
    save(data: Partial<T>): Promise<T>;
    seed(data: object): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    findOne(options: object): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    findByEmail(email: string): Promise<T | null>;
    findByUsername(username: string): Promise<T | null>;
    findByUsernameOrEmail(username: string, email: string): Promise<T | null>;
    paginate(paginationOptions: IPaginationOptions): Promise<IPaginationResult<T>>;
}
