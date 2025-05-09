import {Body, Controller, Get, HttpException, HttpStatus, Patch, Inject, Param, Post, Res,} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ErrorInterceptor, Ok_Empty_Res, receiver} from "../../../../helpers/func";
import { CreateRequestDto, RequestDto } from '../dto/request.dto';
import {ApiParam, ApiResponse, ApiBody} from "@nestjs/swagger";


@Controller('requests')
export class RequestsController {
constructor(@Inject('requests') private readonly requestsC: ClientProxy) {}

  @Get('/:request_id')
  @ApiParam({ name: 'request_id', description: 'The ID of the request' })
  @ApiResponse({ status: 200, description: 'Request found', type: RequestDto })
  async findOne(@Res() res: any, @Param('request_id') request_id: string) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'update', {request_id});
        res.status(result.status).json(result.data);
      })
  }

  @Patch('/user/:user')
  @ApiParam({ name: 'user', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Requests for user' })
  async getRequestConcerned(@Res() res: any, @Param('user') user: string) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'getRequestConcerned', {user});
        res.status(result.status).json(result.data);
    })
  }



  @Get('/batch/:batch')
  @ApiParam({ name: 'batch', description: 'Batch ID' })
  @ApiResponse({ status: 200, description: 'Requests for batch' })
  async getRequestsForBatch(@Res() res: any, @Param('batch') batch: string) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'getRequestsForBatch', {batch});
        res.status(result.status).json(result.data);
    })
  }

  @Get('/author/:matricule')
  @ApiParam({ name: 'matricule', description: 'Matricule ID' })
  @ApiResponse({ status: 200, description: 'Requests for matricule' })
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
  @ApiParam({ name: 'matricule', description: 'Matricule ID' })
  @ApiResponse({ status: 200, description: 'Requests Stats for matricule' })
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
  @ApiBody({ type: CreateRequestDto })
  @ApiResponse({ status: 200, description: 'Fetched requests' })
  async getRequest(@Res() res: any, @Body() data: any) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'getRequest', data);
        res.status(result.status).json(result.data);
    })
  }


  @Post('/')
  @ApiBody({ type: CreateRequestDto })
  @ApiResponse({ status: 201, description: 'Request created' })
  async createRequest(@Res() res: any, @Body() data: any) {

    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'createRequest', data);
        res.status(result.status).json(result.data);
    })

  }


  @Post('/print')
  @ApiBody({ type: CreateRequestDto })
  @ApiResponse({ status: 200, description: 'Request marked as printed' })
  async setPrinted(@Res() res: any, @Body() data: any) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'setPrinted', data);
        res.status(result.status).json(result.data);
    })
  }


  @Post('/report')
  @ApiBody({ type: CreateRequestDto })
  @ApiResponse({ status: 200, description: 'Request report generated' })
  async getReport(@Res() res: any, @Body() data: any) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'getReport', data);
        res.status(result.status).json(result.data);
    })
  }


  @Post('/reject')
  @ApiBody({ type: CreateRequestDto }) 
  @ApiResponse({ status: 200, description: 'Request reject' })
  async rejectRequest(@Res() res: any, @Body() data: any) {
    await ErrorInterceptor(async () => {
        const result = await receiver(this.requestsC, 'rejectRequest', data);
        res.status(result.status).json(result.data);
    })
  }
}

