import {Controller, HttpException, HttpStatus} from '@nestjs/common';
import {LessonsService} from './lessons.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {responder} from "../../../helpers/func";

@Controller()
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {
  }

  @MessagePattern({cmd: 'planning'})
  async planning(@Payload() data: any) {
    try {
      console.log(data)
      const result: any = await this.lessonsService.planning(data);
      console.log(result)
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.NO_CONTENT);
    } catch (e) {
      console.log(e)
      throw new HttpException({
        message: 'Internal Server Error',
        details: e.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
