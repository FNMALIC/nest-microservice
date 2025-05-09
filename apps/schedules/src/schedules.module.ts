import {Module} from '@nestjs/common';
import {SchedulesService} from './schedules.service';
import {DatabaseModule} from "../../../database/database.module";
import {ConfigModule} from "@nestjs/config";
import {ScheduleModule} from "@nestjs/schedule";
import {ModelModule} from "../../../database/model.module";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    ModelModule,
  ],
  providers: [SchedulesService],
})
export class SchedulesModule {
}
