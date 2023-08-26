import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { UploadController } from './upload.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    AuthModule,
    UserModule,
    OrderModule
  ],
  providers: [ProductService],
  controllers: [ProductController, UploadController]
})
export class ProductModule {}
