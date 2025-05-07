import {Body, Controller, Get, HttpStatus, Inject, Param, Patch, Post, Res} from "@nestjs/common";
import {ErrorInterceptor, receiver} from "../../../../helpers/func";
import {ClientProxy} from "@nestjs/microservices";

@Controller('users')
export class UsersController {
  constructor(@Inject('users') private readonly usersC: ClientProxy) {
  }

  @Post('create')
  async create(@Res() res: any, @Body() data: any) {
    await ErrorInterceptor(async () => {
      const result = await receiver(this.usersC, 'update', data);
      res.status(result.status).json(result.data);
    })
  }

  @Patch()
  async update(@Res() res: any, @Body() data: any) {
    await ErrorInterceptor(async () => {
      const result = await receiver(this.usersC, 'update', data);
      res.status(result.status).json(result.data);
    })
  }

  @Get('/:id')
  async getUser(@Res() res: any, @Param('id') id: any) {
    await ErrorInterceptor(async () => {
      const result = await receiver(this.usersC, 'getUser', {id});
      res.status(result.status).json(result.data);
    })
  }

  @Get()
  async gets(@Res() res: any) {
    await ErrorInterceptor(async () => {
      const result = await receiver(this.usersC, 'gets');
      res.status(result.status).json(result.data);
    })
  }
}