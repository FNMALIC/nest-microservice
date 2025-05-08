import {Body, Controller, Get, HttpException, HttpStatus, Patch, Inject, Param, Post, Res,} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ErrorInterceptor, Ok_Empty_Res, receiver} from "../../../../helpers/func";

import { RequestDto } from '../dto/request.dto';
import {ApiBody, ApiOperation} from "@nestjs/swagger";
@Controller('requests')
export class RequestStepsController {

constructor(@Inject('requat-steps') private readonly requeststepsC: ClientProxy) {
}

    @Get('/comment/:id')
  async getCommentRequest(@Res() res, @Param('id') id: string) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requeststepsC, 'getCommentRequest', {id});
        res.status(result.status).json(result.data);
    })
  }

  @Get('/last-steps/:RSTEP_DEST_ID/:RSTEPCONFIG_ID')
  async getRequestLastStepForBatches(
    @Res() res,
    @Param('RSTEP_DEST_ID') RSTEP_DEST_ID: string,
    @Param('RSTEPCONFIG_ID') RSTEPCONFIG_ID: string,
  ) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requeststepsC, 'getRequestLastStepForBatches', {RSTEP_DEST_ID, RSTEPCONFIG_ID});
        res.status(result.status).json(result.data);
    })
  }




  @Get('/:id')
  async getRequestStepsById(@Res() res, @Param('id') id: string) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requeststepsC, 'getRequestStepsById', {id});
        res.status(result.status).json(result.data);
    })
   
  }

  @Post('/routes')
  async getRequestStepByIds(@Res() res, @Body() data) {

    await ErrorInterceptor(async () => {
        const result = await receiver(this.requeststepsC, 'getRequestStepByIds', data);
        res.status(result.status).json(result.data);
    })
  }


  @Post('/')
  async createRequestStep(@Res() res, @Body() data) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requeststepsC, 'createRequestStep', data);
        res.status(result.status).json(result.data);
    })
  }
}
