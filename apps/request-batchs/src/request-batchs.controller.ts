import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { RequestBatchsService } from './request-batchs.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';

@ApiExcludeController()
@Controller('request-batches')
export class RequestBatchsController {
  constructor(private reqBatchService: RequestBatchsService) {}

  // @Get('/:DEST_ID')
  @MessagePattern({cmd: 'getBatches'})
  async getBatches(@Res() res, @Param('DEST_ID') DEST_ID: string) {
    try {
      const result = await this.reqBatchService.getBatches({ DEST_ID });
      if (result) {
        return res.status(HttpStatus.OK).json(result);
      } else return res.status(HttpStatus.NO_CONTENT);
    } catch (e) {
      throw new HttpException(
        {
          message: 'Internal Server Error',
          details: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Post('/transmit')
  @MessagePattern({cmd: 'transmit'})
  async transmit(@Res() res, @Body() data) {
    try {
      const result = await this.reqBatchService.transmit({ data });
      if (result) return res.status(HttpStatus.OK).json(result);
      else {
        return res.status(HttpStatus.NO_CONTENT);
      }
    } catch (e) {
      throw new HttpException(
        {
          message: 'Internal Server Error',
          details: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Patch('/')
  @MessagePattern({cmd: 'confirmBatchReception'})
  async confirmBatchReception(@Res() res, @Body() data) {
    try {
      const result = this.reqBatchService.confirmBatchReception(data);
      if (result) return res.status(HttpStatus.OK).json(result);
      return res.status(HttpStatus.NO_CONTENT);
    } catch (e) {
      throw new HttpException(
        {
          message: 'Internal Server Error',
          details: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Post('/')
  @MessagePattern({cmd: 'createBatch'})
  async createBatch(@Res() res, @Body() data) {
    try {
      const result = await this.reqBatchService.createBatch(data);
      if (result) return res.status(HttpStatus.CREATED).json(result);
      return res.status(HttpStatus.NO_CONTENT);
    } catch (e) {
      throw new HttpException(
        {
          message: 'Internal Server Error',
          details: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Delete('/:batch')
  @MessagePattern({cmd: 'delete'})
  async delete(@Res() res, @Param('batch') batch) {
    try {
      const result = await this.reqBatchService.delete(batch);
      if (result) return res.status(HttpStatus.OK).json(result);
      return res.status(HttpStatus.BAD_REQUEST);
    } catch (e) {
      throw new HttpException(
        {
          message: 'Internal Server Error',
          details: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
