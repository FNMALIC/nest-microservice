import {Body, Controller, Get, Inject, Post, Res,} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ErrorInterceptor, Ok_NoContent_Responder, receiver} from "../../../helpers/func";

@Controller('years')
export class YearsController {
  constructor(
    @Inject('YEARS_SERVICE') private readonly yearClient: ClientProxy) {
  }

  @Get()
  async findAll(@Res() response: any) {
    await ErrorInterceptor(async () => {
      return Ok_NoContent_Responder(await receiver(this.yearClient, 'findAll'), response);
    });
  }

  @Post('/activation')
  async activate(@Res() response: any, @Body() data: any) {
    await ErrorInterceptor(async () => {
      return Ok_NoContent_Responder(await receiver(this.yearClient, 'activate', data), response);
    })
  }
}