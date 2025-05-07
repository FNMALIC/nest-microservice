import { Module } from '@nestjs/common';
import { Request/requestStatusController } from './request/request-status.controller';
import { Request/requestStatusService } from './request/request-status.service';

@Module({
  imports: [],
  controllers: [Request/requestStatusController],
  providers: [Request/requestStatusService],
})
export class Request/requestStatusModule {}
