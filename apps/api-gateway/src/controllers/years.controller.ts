import {Body, Controller, Get, Inject, Post, Res,} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ErrorInterceptor, receiver} from "../../../../helpers/func";
import {ApiBody, ApiConsumes, ApiProperty} from "@nestjs/swagger";

class YearDto {
  @ApiProperty({example: true})
  status: boolean;
  @ApiProperty({example: '155'})
  id: string;
}

@Controller('years')
export class YearsController {
  constructor(
    @Inject('academic-years') private readonly yearC: ClientProxy) {
  }

  @Get()
  async findAll(@Res() res: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.yearC, 'findAll')
      return res.status(result.status).json(result.data);
    });
  }

  @ApiBody({type: YearDto})
  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('/activation')
  async activate(@Res() res: any, @Body() data: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.yearC, 'activate', data)
      return res.status(result.status).json(result.data);
    })
  }
}