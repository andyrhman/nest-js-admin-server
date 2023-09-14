import { Order } from "./order.entity";
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
    order: Order;
}
