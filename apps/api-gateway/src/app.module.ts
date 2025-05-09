// app.module.ts (Gateway)
import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {YearsController} from "./controllers/years.controller";
import {AuthMiddleware} from "../../../helpers/auth.middleware";
import {HandlebarsAdapter} from "../../../helpers/handlebars.adapter";
import {clientProxy} from "../../../helpers/func";
import {UsersController} from "./controllers/users.controller";
import {LessonsController} from "./controllers/lessons.controller";
import {RequestsController} from "./controllers/requests.controller";
import {ConfigModule} from "@nestjs/config";
import {ClassesController} from "./controllers/classes.controller";
import {AuthController} from "./controllers/auth.controller";
import { RequestBatchsController } from './controllers/request-batchs.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ClientsModule.register(Object.keys(clientProxy()).map(c => (
      {
        name: c,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: clientProxy()[c],
          retryAttempts: 5,
          retryDelay: 3000,
        },
      }
    ))),
  ],
  controllers: [AppController, YearsController, UsersController,RequestsController,RequestBatchsController, LessonsController,ClassesController, AuthController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude({path: 'auth', method: RequestMethod.ALL});
    consumer.apply(HandlebarsAdapter).forRoutes('*');
  }
}