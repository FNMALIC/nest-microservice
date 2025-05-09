import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestBatchsController } from './request-batchs.controller';
import { RequestBatchsService } from './request-batchs.service';
import { Requests } from 'models/requests';
import { RequestStepBatches } from 'models/request-step-batchs';
import { RequestBatches } from 'models/request-batchs';


@Module({
  imports: [SequelizeModule.forFeature([RequestBatches, RequestStepBatches, Requests])],
  controllers: [RequestBatchsController],
  providers: [RequestBatchsService],
})
export class RequestBatchsModule {
}
