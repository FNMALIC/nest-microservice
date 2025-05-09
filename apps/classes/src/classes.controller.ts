import {Controller, HttpStatus} from '@nestjs/common';
import {ClassesService} from './classes.service';
import {ErrorInterceptor, responder} from "../../../helpers/func";
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class ClassesController {
  constructor(private classService: ClassesService) {
  }

  @MessagePattern({cmd: 'findAll'})
  async findAll() {
    return await ErrorInterceptor(async () => {
      const result: any = await this.classService.listAll();
      if (result) return responder(HttpStatus.OK, result);
      return responder(HttpStatus.BAD_REQUEST, 'Bad request');
    })
  }

  @MessagePattern({cmd: 'findOne'})
  async findOne(filter: string) {
    return await ErrorInterceptor(async () => {
      const result = await this.classService.findOne({filter});
      if (result) return responder(HttpStatus.OK, result);
      return responder(HttpStatus.NO_CONTENT);
    })
  }

  @MessagePattern({cmd: 'listOfSchool'})
  async listOfSchool() {
    return await ErrorInterceptor(async () => {
      const result = await this.classService.listOfSchool();
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'Bad request',
        });
    })
  }

  @MessagePattern({cmd: 'listOfSchoolForEmployee'})
  async listOfSchoolForEmployee(employee) {
    return await ErrorInterceptor(async () => {
      const result = await this.classService.employeesAffectionSchool(employee);
      return result.length > 0
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'Bad request',
        });
    })
  }

  @MessagePattern({cmd: 'schoolClasses'})
  async schoolClasses(branch: string) {
    return await ErrorInterceptor(async () => {
      const result = await this.classService.schoolClasses(branch);
      if (result.length === 0) return responder(HttpStatus.NO_CONTENT);
      return responder(HttpStatus.OK, result);
    })
  }

  @MessagePattern({cmd: 'affectedSchoolClasses'})
  async affectedSchoolClasses(data) {
    return await ErrorInterceptor(async () => {
      const result = await this.classService.affectedSchoolClasses(data);
      if (result.length === 0) return responder(HttpStatus.NO_CONTENT);
      return responder(HttpStatus.OK, result);
    })
  }

  @MessagePattern({cmd: 'deleteClass'})
  async deleteClass(id) {
    return await ErrorInterceptor(async () => {
      const result: any = await this.classService.deleteClass(id);
      if (!result) return responder(HttpStatus.NO_CONTENT);
      return responder(HttpStatus.OK, result);
    })
  }
}
