import { NestFactory } from '@nestjs/core';
import { Request/requestStepBatchsModule } from './request/request-step-batchs.module';

async function bootstrap() {
  const app = await NestFactory.create(Request/requestStepBatchsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
