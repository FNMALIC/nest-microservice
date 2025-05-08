import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestSteps } from './request-steps';
import { RequestStepsController } from './request-steps.controller';
import { RequestStepsService } from './request-steps.service';
import { RequestStepConfigs } from '../request-step-configs/request-step-configs';
import { LabelDecisions } from '../label-decisions/label-decisions';
import { Requests } from '../requests/requests';
import { Employees } from '../employees/employees';
import { RequestStatus } from '../request-status/request-status';

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
