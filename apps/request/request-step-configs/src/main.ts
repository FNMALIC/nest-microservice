import { NestFactory } from '@nestjs/core';
import { Request/requestStepConfigsModule } from './request/request-step-configs.module';

async function bootstrap() {
  const app = await NestFactory.create(Request/requestStepConfigsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
