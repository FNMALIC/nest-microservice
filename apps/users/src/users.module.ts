import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {DatabaseModule} from "../../../database/database.module";
import {ModelModule} from "../../../database/model.module";

@Module({
  imports: [
    DatabaseModule,
    ModelModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
}
