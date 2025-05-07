import { Controller, Get } from '@nestjs/common';
import { Request/requestStepBatchsService } from './request/request-step-batchs.service';

@Controller()
export class Request/requestStepBatchsController {
  constructor(private readonly request/requestStepBatchsService: Request/requestStepBatchsService) {}

  @Get()
  getHello(): string {
    return this.request/requestStepBatchsService.getHello();
  }
}
