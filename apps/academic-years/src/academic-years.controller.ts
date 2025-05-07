import {Controller, HttpException, HttpStatus,} from '@nestjs/common';
import {AcademicYearsService} from './academic-years.service';
import {MessagePattern} from "@nestjs/microservices";
import {responder} from "../../../helpers/func";

@Controller()
export class AcademicYearsController {
  constructor(private yearsService: AcademicYearsService) {
  }

  @MessagePattern({cmd: 'findAll'})
  async findAll() {
    try {
      const result = await this.yearsService.findAll();
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.NO_CONTENT);
    } catch (e) {
      throw new HttpException(
        {
          message: 'Internal Server Error',
          details: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @MessagePattern({cmd: 'activate'})
  async activate(data) {
    try {
      const result = await this.yearsService.activate(data);
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.NO_CONTENT)
    } catch (e) {
      throw new HttpException(
        {
          message: 'Internal Server Error',
          details: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
