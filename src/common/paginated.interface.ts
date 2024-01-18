export interface IPaginationOptions {
    page: number;
    limit: number;
  }
  
  export interface IPaginationMeta {
    total: number;
    page: number;
    last_page: number;
  }
  
  export interface IPaginationResult<T> {
    data: T[];
    meta: IPaginationMeta;
  }
  