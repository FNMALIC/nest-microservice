import {Module} from '@nestjs/common';
import {ClassesController} from './classes.controller';
import {ClassesService} from './classes.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Classes} from "../../../models/classes";
import {EmployeeSubjects} from "../../../models/employee-subjects";
import {Employees} from "../../../models/employees";
import {Subjects} from "../../../models/subjects";
import {DatabaseModule} from "../../../database/database.module";

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Classes, EmployeeSubjects, Employees, Subjects])],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {
}
