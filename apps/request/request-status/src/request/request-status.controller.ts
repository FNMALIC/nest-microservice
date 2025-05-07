import { Controller, Get } from '@nestjs/common';
import { Request/requestStatusService } from './request/request-status.service';

@Controller()
export class Request/requestStatusController {
  constructor(private readonly request/requestStatusService: Request/requestStatusService) {}

  @Get()
  getHello(): string {
    return this.request/requestStatusService.getHello();
  }
}
