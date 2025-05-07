import { Controller, Get } from '@nestjs/common';
import { Request/requestDisplayConfigsService } from './request/request-display-configs.service';

@Controller()
export class Request/requestDisplayConfigsController {
  constructor(private readonly request/requestDisplayConfigsService: Request/requestDisplayConfigsService) {}

  @Get()
  getHello(): string {
    return this.request/requestDisplayConfigsService.getHello();
  }
}
