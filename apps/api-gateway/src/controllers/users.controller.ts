import {Body, Controller, Delete, Get, Inject, Param, Patch, Post, Res} from "@nestjs/common";
import {ErrorInterceptor, receiver} from "../../../../helpers/func";
import {ClientProxy} from "@nestjs/microservices";
import {ApiBody, ApiConsumes, ApiParam} from "@nestjs/swagger";
import {CreateUserDto, UserDto} from "../dto/UserDto";

@Controller('users')
export class UsersController {
  constructor(@Inject('users') private readonly usersC: ClientProxy) {
  }

  @ApiBody({type: CreateUserDto})
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @Post('create')
  async create(@Res() res: any, @Body() data: any) {
    return await ErrorInterceptor(async () => {
      console.log(data)
      const result = await receiver(this.usersC, 'create', data);
      res.status(result.status).json(result.data);
    })
  }

  @ApiBody({type: UserDto})
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @Patch()
  async update(@Res() res: any, @Body() data: any) {
    return await ErrorInterceptor(async () => {
      const result = await receiver(this.usersC, 'update', data);
      res.status(result.status).json(result.data);
    })
  }

  @ApiParam({name: 'id', type: 'string'})
  @Get('/:id')
  async getUser(@Res() res: any, @Param('id') id: any) {
    return await ErrorInterceptor(async () => {
      const result = await receiver(this.usersC, 'getUser', id);
      res.status(result.status).json(result.data);
    })
  }

  @ApiParam({name: 'id', type: 'string'})
  @Delete('/:id')
  async deleteOne(@Res() res: any, @Param('id') id: any) {
    return await ErrorInterceptor(async () => {
      const result = await receiver(this.usersC, 'deleteOne', id);
      res.status(result.status).json(result.data);
    })
  }

  @Get()
  async gets(@Res() res: any) {
    return await ErrorInterceptor(async () => {
      const result = await receiver(this.usersC, 'gets');
      res.status(result.status).json(result.data);
    })
  }
}