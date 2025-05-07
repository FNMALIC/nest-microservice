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
import { RequestBatchesService } from './request-batchs.service';
// import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('request-batches')
export class RequestBatchesController {
  constructor(private reqBatchService: RequestBatchesService) {}

  @Get('/:DEST_ID')
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

  @Post('/transmit')
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

  @Patch('/')
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

  @Post('/')
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

  @Delete('/:batch')
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
