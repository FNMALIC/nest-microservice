import { Module } from '@nestjs/common';
import { Request/requestGroupsController } from './request/request-groups.controller';
import { Request/requestGroupsService } from './request/request-groups.service';

@Module({
  imports: [],
  controllers: [Request/requestGroupsController],
  providers: [Request/requestGroupsService],
})
export class Request/requestGroupsModule {}
