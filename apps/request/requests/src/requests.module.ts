import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Requests } from '../../../../models/requests';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { RequestCategories } from '../../../../models/request-catetgories';
import { Employees } from '../../../../models/employees';
import { RequestStepBatches } from '../../../../models/request-step-batchs';
import { RequestBatches } from '../../../../models/request-batchs';
import { RequestSteps } from '../../../../models/request-steps';
import { AcademicYears } from '../../../../models/academic-years';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Requests,
      RequestCategories,
      Employees,
      RequestStepBatches,
      RequestBatches,
      RequestSteps,
      AcademicYears,
    ]),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {
}
