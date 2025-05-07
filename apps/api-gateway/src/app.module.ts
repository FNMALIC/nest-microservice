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

@Module({
  imports: [
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
  controllers: [AppController, YearsController, UsersController, LessonsController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude({path: 'auth', method: RequestMethod.ALL});
    consumer.apply(HandlebarsAdapter).forRoutes('*');
  }
}