import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { RequestStepsService } from './request-steps.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('request-steps')
export class RequestStepsController {
  constructor(private requestStepGroup: RequestStepsService) {}

  async getCommentRequest(@Res() res, @Param('id') id: string) {
    try {
      const result = await this.requestStepGroup.getCommentRequest({ id });
      if (result) return res.status(HttpStatus.OK).json(result);
      else return res.status(HttpStatus.BAD_REQUEST);
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

  async getRequestLastStepForBatches(
    @Res() res,
    @Param('RSTEP_DEST_ID') RSTEP_DEST_ID: string,
    @Param('RSTEPCONFIG_ID') RSTEPCONFIG_ID: string,
  ) {
    try {
      const result = await this.requestStepGroup.getRequestLastStepForBatches({
        RSTEPCONFIG_ID,
        RSTEP_DEST_ID,
      });
      if (!result) res.status(HttpStatus.NO_CONTENT);
      return res.status(HttpStatus.OK).json(result);
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

  async getRequestStepsById(@Res() res, @Param('id') id: string) {
    try {
      const result = this.requestStepGroup.getRequestStepsById({
        id,
      });
      if (result) res.status(HttpStatus.NO_CONTENT);
      return res.status(HttpStatus.OK).json(result);
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

  async getRequestStepByIds(@Res() res, @Body() data) {
    try {
      const result = await this.requestStepGroup.getRequestStepByIds(data);
      if (!result) res.status(HttpStatus.NO_CONTENT);
      return res.status(HttpStatus.OK).json(result);
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

  async createRequestStep(@Res() res, @Body() data) {
    try {
      const result = await this.requestStepGroup.createRequestStep(data);
      if (!result) res.status(HttpStatus.NO_CONTENT);
      return res.status(HttpStatus.CREATED).json(result);
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
