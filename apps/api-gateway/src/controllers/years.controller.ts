import {Body, Controller, Get, Inject, Post, Res,} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ErrorInterceptor, Ok_Empty_Res, receiver} from "../../../../helpers/func";
import {ApiBody, ApiOperation} from "@nestjs/swagger";

@Controller('years')
export class YearsController {
  constructor(
    @Inject('academic-years') private readonly yearC: ClientProxy) {
  }

  @Get()
  async findAll(@Res() res: any) {
    await ErrorInterceptor(async () => {
      return Ok_Empty_Res(await receiver(this.yearC, 'findAll'), res);
    });
  }

  @ApiOperation({summary: 'Change year status between active and inactive'})
  @Post('/activation')
  async activate(@Res() res: any, @Body() data: any) {
    await ErrorInterceptor(async () => {
      return Ok_Empty_Res(await receiver(this.yearC, 'activate', data), res);
    })
  }
}