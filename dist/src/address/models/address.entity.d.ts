import { User } from "src/user/models/user.entity";
export declare class Address {
    id: string;
    street: string;
    city: string;
    province: string;
    zip: string;
    country: string;
    phone: number;
    addId(): void;
    user: User;
}
