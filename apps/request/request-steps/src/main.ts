import { NestFactory } from '@nestjs/core';
import { Request/requestStepsModule } from './request/request-steps.module';

async function bootstrap() {
  const app = await NestFactory.create(Request/requestStepsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
