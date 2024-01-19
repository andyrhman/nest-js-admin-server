"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_fastify_1 = require("@nestjs/platform-fastify");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cookie_1 = require("@fastify/cookie");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe());
    const configService = app.get(config_1.ConfigService);
    await app.register(cookie_1.default, {
        secret: configService.get('FASTIFY_COOKIE'),
    });
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true
    });
    await app.listen(8000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map