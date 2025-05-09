import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import {DatabaseModule} from "../../../database/database.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Lessons} from "../../../models/lessons";
import {ModelModule} from "../../../database/model.module";

@Module({
  imports: [
    DatabaseModule,
    ModelModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
