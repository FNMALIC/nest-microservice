import { NestFactory } from '@nestjs/core';
import { Request/requestsModule } from './request/requests.module';

async function bootstrap() {
  const app = await NestFactory.create(Request/requestsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
