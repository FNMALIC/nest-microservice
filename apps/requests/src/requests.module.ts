import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { AcademicYears } from 'models/academic-years';
import { Employees } from 'models/employees';
import { RequestBatches } from 'models/request-batchs';
import { RequestCategories } from 'models/request-catetgories';
import { RequestStepBatches } from 'models/request-step-batchs';
import { RequestSteps } from 'models/request-steps';
import { Requests } from 'models/requests';


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
