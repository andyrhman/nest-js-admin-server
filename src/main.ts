import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // ? Express
  const app = await NestFactory.create(AppModule);

  // Using api as the global url --> http://localhost:5000/api
  app.setGlobalPrefix('api');

  // Adding this for the class validator
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true //passing cookie back and forth in every request remove {passtrough: true}
  });

  // Using cookie parser for jwt
  app.use(cookieParser());

  await app.listen(8000);

  /* 
    ? Wait you can connect mongoose directly in main.ts?
    mongoose.connect('mongodb://localhost/nest_admin')
    .then(() => console.log('📖 Database has been initialized!'))
    .catch((err) => console.error(err));

    ? Fastify
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
 */
}
bootstrap();
