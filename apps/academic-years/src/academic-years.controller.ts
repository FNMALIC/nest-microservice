import {Controller, HttpStatus,} from '@nestjs/common';
import {AcademicYearsService} from './academic-years.service';
import {MessagePattern} from "@nestjs/microservices";
import {ErrorInterceptor, responder} from "../../../helpers/func";

@Controller()
export class AcademicYearsController {
  constructor(private yearsService: AcademicYearsService) {
  }

  @MessagePattern({cmd: 'findAll'})
  async findAll() {
    return await ErrorInterceptor(async () => {
      const result = await this.yearsService.findAll();
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.NO_CONTENT);
    })
  }

  @MessagePattern({cmd: 'activate'})
  async activate(data) {
    return await ErrorInterceptor(async () => {
      const result = await this.yearsService.activate(data);
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.NO_CONTENT)
    })
  }
}
