import { NestFactory } from '@nestjs/core';
import { Request/requestBatchModule } from './request/request-batch.module';

async function bootstrap() {
  const app = await NestFactory.create(Request/requestBatchModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
