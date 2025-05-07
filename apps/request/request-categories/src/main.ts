import { NestFactory } from '@nestjs/core';
import { Request/requestCategoriesModule } from './request/request-categories.module';

async function bootstrap() {
  const app = await NestFactory.create(Request/requestCategoriesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
