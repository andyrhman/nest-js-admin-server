import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Address } from './models/address.entity';
import { User } from 'src/user/models/user.entity';

@Injectable()
export class AddressService extends AbstractService{
    constructor(@InjectRepository(Address) private readonly addressRepository: Repository<Address>){
        super(addressRepository);
    }

    async createAddress(data): Promise<any>{
        const address = new Address();
        address.street = data.street;
        address.city = data.city;
        address.province = data.province;
        address.zip = data.zip;
        address.country = data.country;
        address.phone = data.phone;
        address.user = data.user; // Assign the passed user instance to address.user
    
        await this.addressRepository.save(address);
    }
}
