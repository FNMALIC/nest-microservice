import { Module } from '@nestjs/common';
import { Request/requestStepsController } from './request/request-steps.controller';
import { Request/requestStepsService } from './request/request-steps.service';

@Module({
  imports: [],
  controllers: [Request/requestStepsController],
  providers: [Request/requestStepsService],
})
export class Request/requestStepsModule {}
