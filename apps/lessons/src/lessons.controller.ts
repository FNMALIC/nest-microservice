import {Controller, HttpStatus} from '@nestjs/common';
import {LessonsService} from './lessons.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {ErrorInterceptor, responder} from "../../../helpers/func";

@Controller()
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {
  }

  @MessagePattern({cmd: 'planning'})
  async planning(data: any) {
    return await ErrorInterceptor(async () => {
      const result: any = await this.lessonsService.planning(data);
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.NO_CONTENT);
    })
  }
}
