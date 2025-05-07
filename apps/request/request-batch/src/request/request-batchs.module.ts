import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestBatches } from './request-batchs';
import { RequestBatchesController } from './request-batchs.controller';
import { RequestBatchesService } from './request-batchs.service';
// import { RequestStepBatches } from '../request-step-batchs/request-step-batchs';
// import { Requests } from '../requests/requests';

@Module({
  imports: [SequelizeModule.forFeature([RequestBatches, RequestStepBatches, Requests])],
  controllers: [RequestBatchesController],
  providers: [RequestBatchesService],
})
export class RequestBatchesModule {
}
