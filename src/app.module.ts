import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'config/config.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
// import { ProductModule } from './product/product.module';
// import { OrderModule } from './order/order.module';
import { PermissionGuard } from './permission/permission.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigurationModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot('mongodb://localhost/nest_admin'),
    UserModule,
    CommonModule,
    RoleModule,
    PermissionModule,
    AuthModule,
    // ProductModule,
    // OrderModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    }
  ]
})
export class AppModule { }
