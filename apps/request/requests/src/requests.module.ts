import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Requests } from './requests';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { RequestCategories } from '../request-categories/request-catetgories';
import { Employees } from '../employees/employees';
import { RequestStepBatches } from '../request-step-batchs/request-step-batchs';
import { RequestBatches } from '../request-batchs/request-batchs';
import { RequestSteps } from '../request-steps/request-steps';
import { AcademicYears } from '../academic-years/academic-years';

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
