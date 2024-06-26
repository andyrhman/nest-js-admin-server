import { ProductImages } from "./product-images.entity";
import { OrderItem } from "src/order/models/order-item.entity";
export declare class Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    price: number;
    created_at: string;
    updated_at: string;
    addId(): void;
    product_images: ProductImages[];
    order_items: OrderItem[];
}
