import {Module} from '@nestjs/common';
import {SchedulesController} from './schedules.controller';
import {SchedulesService} from './schedules.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {AcademicYears} from "../../../models/academic-years";
import {Classes} from "../../../models/classes";
import {Employees} from "../../../models/employees";
import {EmployeeSubjects} from "../../../models/employee-subjects";
import {Lessons} from "../../../models/lessons";
import PaymentFees from "../../../models/payment-fees";
import {Students} from "../../../models/students";
import {Subjects} from "../../../models/subjects";
import PaymentNetworks from "../../../models/payment-networks";
import {Specialities} from "../../../models/specialities";
import {DatabaseModule} from "../../../database/database.module";
import {ConfigModule} from "@nestjs/config";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    SequelizeModule.forFeature([
      AcademicYears,
      Classes,
      Employees,
      EmployeeSubjects,
      Lessons,
      PaymentFees,
      Students,
      Subjects,
      PaymentNetworks,
      Specialities,
    ])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {
}
