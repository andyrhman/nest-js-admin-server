import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { fakerID_ID as faker } from "@faker-js/faker";
import { OrderService } from "src/order/order.service";
import { OrderItemService } from "src/order/order-items.service";
import { randomInt } from "crypto";
import { justForFun } from "./just.for.fun";

const bootstrap = async () => {
    const app = await NestFactory.createApplicationContext(AppModule);

    const orderService = app.get(OrderService);
    const orderItemService = app.get(OrderItemService);

    for (let i = 0; i < 30; i++) {
        const order = await orderService.create({
            name: faker.person.fullName(),
            email: faker.internet.email()
        });

        for (let j = 0; j < randomInt(1, 5); j++) {
            await orderItemService.create({
                order: order,
                product_title: faker.commerce.productName(),
                price: faker.commerce.price({ min: 100, max: 1000, dec: 0 }),
                quantity: randomInt(1, 5)
            });
        }
    }
    justForFun();
    process.exit()
}
bootstrap();