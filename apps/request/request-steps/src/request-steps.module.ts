import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestSteps } from '../../../../models//request-steps';
import { RequestStepsController } from './request-steps.controller';
import { RequestStepsService } from './request-steps.service';
import { RequestStepConfigs } from '../../../../models//request-step-configs';
import { LabelDecisions } from '../../../../models/label-decisions';
import { Requests } from '../../../../models//requests';
import { Employees } from '../../../../models//employees';
import { RequestStatus } from '../../../../models//request-status';

@Module({
  imports: [
    SequelizeModule.forFeature([
      RequestSteps,
      RequestStepConfigs,
      LabelDecisions,
      Requests,
      Employees,
      RequestStatus,
    ]),
  ],
  controllers: [RequestStepsController],
  providers: [RequestStepsService],
})
export class RequestStepsModule {}
