import {Injectable, NestMiddleware} from '@nestjs/common';
import * as express from 'express';
import * as exphbs from 'express-handlebars';

@Injectable()
export class HandlebarsAdapter implements NestMiddleware {
  use(req: express.Request, res: express.Response, next: Function) {
    res.locals.hbs = exphbs.create({
      defaultLayout: 'main', // Set your default layout file (e.g., 'main.hbs')
      // Add any other Handlebars options you need here
    });
    next();
  }
}