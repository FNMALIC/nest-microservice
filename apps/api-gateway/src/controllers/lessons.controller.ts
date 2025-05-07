import {Body, Controller, Inject, Post, Res} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ErrorInterceptor, Ok_Empty_Res, receiver} from "../../../../helpers/func";

@Controller('lessons')
export class LessonsController {
  constructor(@Inject('lessons') private readonly lessonsC: ClientProxy) {
  }

  @Post('/time-table')
  async planning(@Res() res: any, @Body() body: any) {
    await ErrorInterceptor(async () => {
      return Ok_Empty_Res(await receiver(this.lessonsC, 'planning', body), res);
    });
  }
}
