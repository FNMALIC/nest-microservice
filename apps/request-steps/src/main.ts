import { NestFactory } from '@nestjs/core';
import { RequestStepsModule } from './request-steps.module';

async function bootstrap() {
  const app = await NestFactory.create(RequestStepsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
