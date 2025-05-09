import {Module} from '@nestjs/common';
import {AcademicYearsController} from './academic-years.controller';
import {AcademicYearsService} from './academic-years.service';
import {DatabaseModule} from "../../../database/database.module";
import {ModelModule} from "../../../database/model.module";

@Module({
  imports: [
    DatabaseModule,
    ModelModule,
  ],
  controllers: [AcademicYearsController],
  providers: [AcademicYearsService],
})
export class AcademicYearsModule {
}
