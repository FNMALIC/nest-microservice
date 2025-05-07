import {Module} from '@nestjs/common';
import {AcademicYearsController} from './academic-years.controller';
import {AcademicYearsService} from './academic-years.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {AcademicYears} from "../../../models/academic-years";
import {DatabaseModule} from "../../../database/database.module";

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([AcademicYears])
  ],
  controllers: [AcademicYearsController],
  providers: [AcademicYearsService],
})
export class AcademicYearsModule {
}
