import { Module } from '@nestjs/common';
import { Request/requestDisplayConfigsController } from './request/request-display-configs.controller';
import { Request/requestDisplayConfigsService } from './request/request-display-configs.service';

@Module({
  imports: [],
  controllers: [Request/requestDisplayConfigsController],
  providers: [Request/requestDisplayConfigsService],
})
export class Request/requestDisplayConfigsModule {}
