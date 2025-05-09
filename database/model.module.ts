import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {models} from "./models";

@Module({
  imports: [
    SequelizeModule.forFeature(models)
  ],
  exports: [
    SequelizeModule.forFeature(models),
  ]
})
export class ModelModule {
}