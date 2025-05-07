import {Controller, Get, HttpStatus,} from '@nestjs/common';
import {AcademicYearsService} from './academic-years.service';
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class AcademicYearsController {
  constructor(private yearsService: AcademicYearsService) {
  }

  @MessagePattern({cmd: 'findAll'})
  async findAll() {
    return await this.yearsService.findAll()
  }

  @MessagePattern({cmd: 'activate'})
  async activate(data) {
    return await this.yearsService.activate(data)
  }
}
