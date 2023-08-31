import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address } from './models/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([Address]),
  ],
  providers: [AddressService],
  controllers: [AddressController]
})
export class AddressModule {}
