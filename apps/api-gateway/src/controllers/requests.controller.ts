import {Body, Controller, Get, HttpException, HttpStatus, Patch, Inject, Param, Post, Res,} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ErrorInterceptor, Ok_Empty_Res, receiver} from "../../../../helpers/func";

@Controller('requests')
export class RequestsController {

constructor(@Inject('requests') private readonly requestsC: ClientProxy) {
}

  @Get('/:request_id')
  async findOne(@Res() res: any, @Param('request_id') request_id: string) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'update', {request_id});
        res.status(result.status).json(result.data);
      })
  }

  @Patch('/user/:user')
  async getRequestConcerned(@Res() res: any, @Param('user') user: string) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'getRequestConcerned', {user});
        res.status(result.status).json(result.data);
    })
  }



  @Get('/batch/:batch')
  async getRequestsForBatch(@Res() res: any, @Param('batch') batch: string) {

    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'getRequestsForBatch', {batch});
        res.status(result.status).json(result.data);
    })
  }

  @Get('/author/:matricule')
  async getRequestConcernedAuthor(
    @Res() res: any,
    @Param('matricule') matricule: string,
  ) {

    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'getRequestConcernedAuthor', {matricule});
        res.status(result.status).json(result.data);
    })
  }


  @Get('stats/user/:matricule')
  async getStatRequestForUser(
    @Res() res: any,
    @Param('matricule') matricule: string,
  ) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'getStatRequestForUser', {matricule});
        res.status(result.status).json(result.data);
    })
  }


  @Post('/all')
  async getRequest(@Res() res: any, @Body() data: any) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'getRequest', data);
        res.status(result.status).json(result.data);
    })
  }


  @Post('/')
  async createRequest(@Res() res: any, @Body() data: any) {

    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'createRequest', data);
        res.status(result.status).json(result.data);
    })

  }


  @Post('/print')
  async setPrinted(@Res() res: any, @Body() data: any) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'setPrinted', data);
        res.status(result.status).json(result.data);
    })
  }


  @Post('/report')
  async getReport(@Res() res: any, @Body() data: any) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'getReport', data);
        res.status(result.status).json(result.data);
    })
  }


  @Post('/reject')
  async rejectRequest(@Res() res: any, @Body() data: any) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'rejectRequest', data);
        res.status(result.status).json(result.data);
    })
  }
}
