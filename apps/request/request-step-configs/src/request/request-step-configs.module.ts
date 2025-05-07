import { Module } from '@nestjs/common';
import { Request/requestStepConfigsController } from './request/request-step-configs.controller';
import { Request/requestStepConfigsService } from './request/request-step-configs.service';

@Module({
  imports: [],
  controllers: [Request/requestStepConfigsController],
  providers: [Request/requestStepConfigsService],
})
export class Request/requestStepConfigsModule {}
