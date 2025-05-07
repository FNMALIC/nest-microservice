import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {DatabaseModule} from "../../../database/database.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Users} from "../../../models/users";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {clientProxy} from "../../../helpers/func";
import {RequestGroups} from "../../../models/request-groups";
import {OrganizationGroups} from "../../../models/organization-groups";

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([Users, RequestGroups, OrganizationGroups]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
}
