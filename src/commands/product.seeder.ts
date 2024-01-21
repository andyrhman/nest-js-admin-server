import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { fakerID_ID as faker } from "@faker-js/faker";
import { ProductService } from "src/product/product.service";
import { justForFun } from "./just.for.fun";

const bootstrap = async () => {
    const app = await NestFactory.createApplicationContext(AppModule);

    const productService = app.get(ProductService);

    for (let i = 0; i < 30; i++) {
        await productService.create({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            image: faker.image.urlLoremFlickr({ width: 200, height: 200, category: 'food' }),
            price: faker.commerce.price({ min: 100, max: 1000, dec: 0 })
        });
    }

    justForFun();
    process.exit()
}
bootstrap();