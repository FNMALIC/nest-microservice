import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import {DatabaseModule} from "../../../database/database.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Lesson} from "../../../models/lessons";

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Lesson])
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
