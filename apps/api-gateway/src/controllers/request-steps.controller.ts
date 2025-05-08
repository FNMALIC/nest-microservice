import {Body, Controller, Get, HttpException, HttpStatus, Patch, Inject, Param, Post, Res,} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ErrorInterceptor, Ok_Empty_Res, receiver} from "../../../../helpers/func";

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
   
    // try {
    //   const result = this.requestStepGroup.getRequestStepsById({
    //     id,
    //   });
    //   if (result) res.status(HttpStatus.NO_CONTENT);
    //   return res.status(HttpStatus.OK).json(result);
    // } catch (e) {
    //   throw new HttpException(
    //     {
    //       message: 'Internal Server Error',
    //       details: e.message,
    //     },
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  @Post('/routes')
  async getRequestStepByIds(@Res() res, @Body() data) {

    await ErrorInterceptor(async () => {
        const result = await receiver(this.requeststepsC, 'getRequestStepByIds', data);
        res.status(result.status).json(result.data);
    })
    // try {
    //   const result = await this.requestStepGroup.getRequestStepByIds(data);
    //   if (!result) res.status(HttpStatus.NO_CONTENT);
    //   return res.status(HttpStatus.OK).json(result);
    // } catch (e) {
    //   throw new HttpException(
    //     {
    //       message: 'Internal Server Error',
    //       details: e.message,
    //     },
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }


  @Post('/')
  async createRequestStep(@Res() res, @Body() data) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requeststepsC, 'createRequestStep', data);
        res.status(result.status).json(result.data);
    })

    // try {
    //   const result = await this.requestStepGroup.createRequestStep(data);
    //   if (!result) res.status(HttpStatus.NO_CONTENT);
    //   return res.status(HttpStatus.CREATED).json(result);
    // } catch (e) {
    //   throw new HttpException(
    //     {
    //       message: 'Internal Server Error',
    //       details: e.message,
    //     },
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }
}
