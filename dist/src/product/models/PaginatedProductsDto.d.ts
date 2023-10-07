import { Product } from "./product.entity";
declare class PaginationMetaDto {
    total: number;
    page: number;
    last_page: number;
}
export declare class PaginatedProductsDto {
    data: Product[];
    meta: PaginationMetaDto;
}
export {};
