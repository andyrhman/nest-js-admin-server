import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Address } from './models/address.entity';
export declare class AddressService extends AbstractService {
    private readonly addressRepository;
    constructor(addressRepository: Repository<Address>);
    createAddress(data: any): Promise<any>;
}
