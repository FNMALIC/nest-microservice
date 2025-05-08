import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import {DatabaseModule} from "../../../database/database.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Lessons} from "../../../models/lessons";

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Lessons])
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
