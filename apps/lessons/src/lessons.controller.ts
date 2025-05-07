import {Controller} from '@nestjs/common';
import {LessonsService} from './lessons.service';
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {
  }

  @MessagePattern({cmd: 'planning'})
  async planning(params: any) {
    return await this.lessonsService.planning(params);
  }
}
