import {Body, Controller, Get, HttpException, HttpStatus, Patch, Inject, Param, Post, Res, Delete,} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ErrorInterceptor, Ok_Empty_Res, receiver} from "../../../../helpers/func";
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateRequestBatchsDto, RequestbatchsDto } from '../dto/request-batchs.dto';

@Controller('requests')
export class RequestBatchsController {

constructor(@Inject('request-batchs') private readonly requestbatchC: ClientProxy) {
}


@Get('/:DEST_ID')
  @ApiParam({ name: 'request_id', description: 'The ID of the request' })
  @ApiResponse({ status: 200, description: 'Request found', type: RequestbatchsDto })
async getBatches(@Res() res, @Param('DEST_ID') DEST_ID: string) {
  await ErrorInterceptor(async () => {
    const result = await receiver(this.requestbatchC, 'getBatches', {DEST_ID});
    res.status(result.status).json(result.data);
  })
}

@Post('/transmit')
async transmit(@Res() res, @Body() data) {
  await ErrorInterceptor(async () => {
    const result = await receiver(this.requestbatchC, 'transmit', {data});
    res.status(result.status).json(result.data);
  })
}



@Patch('/')
@ApiBody({ type: CreateRequestBatchsDto })
@ApiResponse({ status: 200, description: 'update for request batches' })
async confirmBatchReception(@Res() res, @Body() data) {
  await ErrorInterceptor(async () => {
    const result = await receiver(this.requestbatchC, 'confirmBatchReception', {data});
    res.status(result.status).json(result.data);
  })
}

@Post('/')
@ApiBody({ type: CreateRequestBatchsDto })
@ApiResponse({ status: 200, description: 'create request batches' })
async createBatch(@Res() res, @Body() data) {
  await ErrorInterceptor(async () => {
    const result = await receiver(this.requestbatchC, 'createBatch', {data});
    res.status(result.status).json(result.data);
  })

}

@Delete('/:batch')
@ApiParam({ name: 'batch', description: 'The ID of the request' })
@ApiResponse({ status: 200, description: 'delete request batches' })
async delete(@Res() res, @Param('batch') batch) {
  await ErrorInterceptor(async () => {
    const result = await receiver(this.requestbatchC, 'delete', {batch});
    res.status(result.status).json(result.data);
  })

}
}
