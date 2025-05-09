import {Module} from '@nestjs/common';
import {ClassesController} from './classes.controller';
import {ClassesService} from './classes.service';
import {DatabaseModule} from "../../../database/database.module";
import {ModelModule} from "../../../database/model.module";

@Module({
  imports: [
    DatabaseModule,
    ModelModule,
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {
}
