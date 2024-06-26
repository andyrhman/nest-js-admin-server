import { Address } from 'src/address/models/address.entity';
import { Role } from 'src/role/models/role.entity';
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    addId(): void;
    role: Role;
    address: Address[];
}
