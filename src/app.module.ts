import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'config/config.module';
import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
// import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
// import { ProductModule } from './product/product.module';
// import { OrderModule } from './order/order.module';
import { APP_GUARD } from '@nestjs/core';
// import { PermissionGuard } from './permission/permission.guard';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigurationModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot('mongodb://localhost/nest_admin'),
    // AuthModule,
    UserModule,
    // CommonModule,
    RoleModule,
    PermissionModule,
    // ProductModule,
    // OrderModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: PermissionGuard
  //   }
  // ]
})
export class AppModule { }
