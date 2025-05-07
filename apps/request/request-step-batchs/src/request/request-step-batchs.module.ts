import { Module } from '@nestjs/common';
import { Request/requestStepBatchsController } from './request/request-step-batchs.controller';
import { Request/requestStepBatchsService } from './request/request-step-batchs.service';

@Module({
  imports: [],
  controllers: [Request/requestStepBatchsController],
  providers: [Request/requestStepBatchsService],
})
export class Request/requestStepBatchsModule {}
