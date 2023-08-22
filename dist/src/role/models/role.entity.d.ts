import { Permission } from 'src/permission/models/permission.entity';
export declare class Role {
    id: string;
    name: string;
    permissions: Permission[];
}
