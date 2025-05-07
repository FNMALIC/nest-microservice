import { NestFactory } from '@nestjs/core';
import { Request/requestStatusModule } from './request/request-status.module';

async function bootstrap() {
  const app = await NestFactory.create(Request/requestStatusModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
