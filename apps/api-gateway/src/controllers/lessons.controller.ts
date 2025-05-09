import {Body, Controller, Inject, Post, Res} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ErrorInterceptor, receiver} from "../../../../helpers/func";
import {ApiBody, ApiConsumes} from "@nestjs/swagger";
import {FetchLessonDto} from "../dto/FetchLessonDto";

@Controller('lessons')
export class LessonsController {
  constructor(@Inject('lessons') private readonly lessonsC: ClientProxy) {
  }

  @ApiBody({type: FetchLessonDto})
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @Post('/time-table')
  async planning(@Res() res: any, @Body() body: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.lessonsC, 'planning', body)
      return res.status(result.status).json(result.data);
    });
  }
}
