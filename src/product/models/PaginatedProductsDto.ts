import { Product } from "./product.entity";

class PaginationMetaDto {
    total: number;
    page: number;
    last_page: number;
}

export class PaginatedProductsDto {
    data: Product[];
    meta: PaginationMetaDto;
}
