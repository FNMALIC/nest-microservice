import {Body, Controller, Inject, Post, Res} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ErrorInterceptor, receiver} from "../../../../helpers/func";
import {ApiBody} from "@nestjs/swagger";

@Controller('lessons')
export class LessonsController {
  constructor(@Inject('lessons') private readonly lessonsC: ClientProxy) {
  }

  @Post('/time-table')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        EMPLOYEE_ID: {type: 'string', description: 'User ID'},
        END_DATE: {type: 'string', description: 'End Date'},
        START_DATE: {type: 'string', description: 'Start Date'},
      },
      required: ['EMPLOYEE_ID', 'START_DATE', 'END_DATE'],
    },
  })
  async planning(@Res() res: any, @Body() body: any) {
    await ErrorInterceptor(async () => {
      let result = await receiver(this.lessonsC, 'planning', body)
      return res.status(result.status).json(result.data);
    });
  }
}
