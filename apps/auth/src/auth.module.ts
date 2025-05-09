import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {DatabaseModule} from "../../../database/database.module";
import {ModelModule} from "../../../database/model.module";

@Module({
  imports: [
    DatabaseModule,
    ModelModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
}
