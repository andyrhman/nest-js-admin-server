import { Repository } from 'typeorm';
import { PaginatedResult } from './paginated-result.interface';
export declare abstract class AbstractService {
    protected readonly repository: Repository<any>;
    protected constructor(repository: Repository<any>);
    all(relations?: any[]): Promise<any[]>;
    paginate(page?: number, relations?: any[]): Promise<PaginatedResult>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<any>;
    findOne(options: any, relations?: any[]): Promise<any>;
    findByUsernameOrEmail(username: string, email: string): Promise<any | null>;
    findByEmail(email: string): Promise<any | null>;
    findByUsername(username: string): Promise<any | null>;
}
