import { AddressService } from './address.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
export declare class AddressController {
    private addressService;
    private userService;
    private authService;
    constructor(addressService: AddressService, userService: UserService, authService: AuthService);
    all(): Promise<any[]>;
    test(request: Request, body: any): Promise<{
        message: string;
    }>;
    get(request: Request): Promise<any>;
    update(body: any, request: Request): Promise<{
        message: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
