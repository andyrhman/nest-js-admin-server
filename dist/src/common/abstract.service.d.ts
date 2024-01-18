/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { IPaginationOptions, IPaginationResult } from "./paginated.interface";
export declare abstract class AbstractService<T extends Document> {
    protected model: Model<T>;
    protected constructor(model: Model<T>);
    all(): Promise<T[]>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    findOne(options: object): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    findOneWithRelations(data: any, options: any): Promise<import("mongoose").UnpackedIntersection<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Require_id<T>>, {}>>;
    findByEmail(email: string): Promise<T | null>;
    findByUsername(username: string): Promise<T | null>;
    findByUsernameOrEmail(username: string, email: string): Promise<T | null>;
    paginate(paginationOptions: IPaginationOptions): Promise<IPaginationResult<T>>;
}
