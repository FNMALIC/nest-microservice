import {Controller, Get, HttpException, HttpStatus} from '@nestjs/common';
import {ClassesService} from './classes.service';
import {responder} from "../../../helpers/func";
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class ClassesController {
  constructor(private classService: ClassesService) {
  }

  @MessagePattern({cmd: 'findAll'})
  async findAll() {
    try {
      const result: any = await this.classService.listAll();
      if (result) return responder(HttpStatus.OK, result);
      else {
        return responder(HttpStatus.BAD_REQUEST, {message: 'Bad request'});
      }
    } catch (e) {
      throw new HttpException({
        message: 'Internal Server Error',
        details: e.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @MessagePattern({cmd: 'findOne'})
  async findOne(filter: string) {
    try {
      const result = this.classService.findOne({filter});
      if (result) responder(HttpStatus.NO_CONTENT);
    } catch (e) {
      throw new HttpException({
        message: 'Internal Server Error',
        details: e.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @MessagePattern({cmd: 'listOfSchool'})
  async listOfSchool() {
    try {
      const result = this.classService.listOfSchool();
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'Bad request',
        });
    } catch (e) {
      throw new HttpException({
        message: 'Internal Server Error',
        details: e.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @MessagePattern({cmd: 'listOfSchoolForEmployee'})
  async listOfSchoolForEmployee(employee) {
    try {
      const result = await this.classService.employeesAffectionSchool(employee);
      return result.length > 0
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'Bad request',
        });
    } catch (e) {
      throw new HttpException({
        message: 'Internal Server Error',
        details: e.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @MessagePattern({cmd: 'setDepartment'})
  // async setDepartment(data: any) {
  //   try {
  //     const result = await this.classService.setDepartment(data);
  //     if (!result) return responder(HttpStatus.NO_CONTENT);
  //     else return responder(HttpStatus.OK, result);
  //   } catch (e) {
  //     throw new HttpException({
  //       message: 'Internal Server Error',
  //       details: e.message,
  //     }, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  @MessagePattern({cmd: 'schoolClasses'})
  async schoolClasses(branch: string) {
    try {
      const result = await this.classService.schoolClasses(branch);
      if (result.length === 0) responder(HttpStatus.NO_CONTENT);
      else responder(HttpStatus.OK, result);
    } catch (e) {
      throw new HttpException({
        message: 'Internal Server Error',
        details: e.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @Get('affected/:school/:employee')
  // @MessagePattern({cmd: 'affectedSchoolClasses'})
  // async affectedSchoolClasses(data:{employee: string,school: string},
  // ) {
  //   try {
  //     const result = await this.classService.affectedSchoolClasses({
  //       school,
  //       employee,
  //     });
  //     if (result.length === 0) responder(HttpStatus.NO_CONTENT);
  //     else responder(HttpStatus.OK,result);
  //   } catch (e) {
  //     throw new HttpException({
  //       message: 'Internal Server Error',
  //       details: e.message,
  //     }, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
  //
  // @Delete('/:id')
  // async deleteClass(@Res() res: any, @Param('id') id: string) {
  //   try {
  //     const result: any = await this.classService.deleteClass(id);
  //     if (!result) return res.status(HttpStatus.NO_CONTENT);
  //     return res.status(HttpStatus.OK).json(result);
  //   } catch (e) {
  //     throw new HttpException({
  //       message: 'Internal Server Error',
  //       details: e.message,
  //     }, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
}
