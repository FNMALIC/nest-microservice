import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import {MessagePattern} from "@nestjs/microservices";

@Controller('requests')
export class RequestsController {
  constructor(private requestService: RequestsService) {}

  @MessagePattern({cmd: 'findOne'})
  async findOne(@Res() res: any, @Param('request_id') request_id: string) {
    try {
      const result = this.requestService.getOne({ request_id });
      if (result) res.status(HttpStatus.NO_CONTENT);
      return result;
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

  @MessagePattern({cmd: 'getRequestConcerned'})
  async getRequestConcerned(@Res() res: any, @Param('user') user: string) {
    try {
      const result = await this.requestService.getRequestConcerned({ user });
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

  @MessagePattern({cmd: 'getRequestConcerned'})
  async getRequestsForBatch(@Res() res: any, @Param('batch') batch: string) {
    try {
      const result = await this.requestService.getRequestsForBatch(batch);
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

  @MessagePattern({cmd: 'getRequestConcernedAuthor'})
  async getRequestConcernedAuthor(
    @Res() res: any,
    @Param('matricule') matricule: string,
  ) {
    try {
      const result = await this.requestService.getRequestConcernedAuthor({
        matricule,
      });
      if (result) res.status(HttpStatus.OK).json(result);
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

  async getStatRequestForUser(
    @Res() res: any,
    @Param('matricule') matricule: string,
  ) {
    try {
      const result = await this.requestService.getStatRequestForUser({
        matricule,
      });
      if (result) return res.status(HttpStatus.OK).json(result);
      else return res.status(HttpStatus.NO_CONTENT);
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

  async getRequest(@Res() res: any, @Body() data: any) {
    try {
      const result = await this.requestService.getOne(data);
      if (result) return res.status(HttpStatus.OK).json(result);
      else return res.status(HttpStatus.NO_CONTENT);
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

  async createRequest(@Res() res: any, @Body() data: any) {
    try {
      const result = await this.requestService.createRequest(data);
      return result
        ? res.status(HttpStatus.CREATED).json(result)
        : res.status(HttpStatus.BAD_REQUEST).json({
            message: 'Bad request',
          });
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

  async setPrinted(@Res() res: any, @Body() data: any) {
    try {
      const result = await this.requestService.setPrinted(data);
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

  async getReport(@Res() res: any, @Body() data: any) {
    try {
      const result = this.requestService.getReport(data);
      if (result) res.status(HttpStatus.NO_CONTENT);
      return result;
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

  async rejectRequest(@Res() res: any, @Body() data: any) {
    try {
      const result = this.requestService.rejectRequest(data);
      if (result) res.status(HttpStatus.NO_CONTENT);
      return result;
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
