import {Controller, Delete, Get, Inject, Param, Res} from '@nestjs/common';
import {ClientProxy, MessagePattern} from "@nestjs/microservices";
import {ErrorInterceptor, receiver} from "../../../../helpers/func";

@Controller("classes")
export class ClassesController {
  constructor(@Inject('classes') private readonly classesC: ClientProxy) {
  }

  @Get()
  async findAll(@Res() res: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.classesC, 'findAll')
      return res.status(result.status).json(result.data);
    })
  }

  @Get('school')
  async listOfSchool(@Res() res: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.classesC, 'listOfSchool')
      return res.status(result.status).json(result.data);
    })
  }

  @Get('/:filter')
  async findOne(@Res() res: any, @Param('filter') filter: string) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.classesC, 'findOne', filter)
      return res.status(result.status).json(result.data);
    })
  }

  @Get('school/affected/:employee')
  async listOfSchoolForEmployee(@Res() res: any, @Param('employee') employee: string) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.classesC, 'listOfSchoolForEmployee', employee)
      return res.status(result.status).json(result.data);
    })
  }

  @Get('school/:id')
  async schoolClasses(@Res() res: any, @Param('id') branch: string) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.classesC, 'schoolClasses', branch)
      return res.status(result.status).json(result.data);
    })
  }

  @Get('affected/:school/:employee')
  async affectedToTeacherBySchool(@Res() res: any, @Param('employee') employee: string, @Param('school') school: string,) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.classesC, 'affectedSchoolClasses', {
        school,
        employee,
      })
      return res.status(result.status).json(result.data);
    })
  }

  @Delete('/:id')
  async deleteClass(@Res() res: any, @Param('id') id: string) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.classesC, 'deleteClass', id)
      return res.status(result.status).json(result.data);
    })
  }
}
