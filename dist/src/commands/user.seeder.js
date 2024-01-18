"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const user_service_1 = require("../user/user.service");
const argon2 = require("argon2");
const faker_1 = require("@faker-js/faker");
const bootstrap = async () => {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userService = app.get(user_service_1.UserService);
    const password = await argon2.hash("123123");
    for (let i = 0; i < 30; i++) {
        await userService.create({
            fullName: faker_1.fakerID_ID.person.fullName(),
            username: faker_1.fakerID_ID.internet.userName(),
            email: faker_1.fakerID_ID.internet.email(),
            password
        });
    }
    process.exit();
};
bootstrap();
//# sourceMappingURL=user.seeder.js.map