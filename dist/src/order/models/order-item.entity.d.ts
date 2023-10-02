import { Order } from "./order.entity";
import { Product } from "src/product/models/product.entity";
export declare enum OrderItemStatus {
    SedangDikemas = "Sedang Dikemas",
    Dikirim = "Dikirim",
    Selesai = "Selesai"
}
export declare class OrderItem {
    id: number;
    product_title: string;
    price: number;
    quantity: number;
    status: OrderItemStatus;
    product_id: string;
    order: Order;
    product: Product;
}
