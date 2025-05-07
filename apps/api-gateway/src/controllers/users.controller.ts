import {Body, Controller, Get, HttpStatus, Inject, Param, Patch, Post, Res} from "@nestjs/common";
import {ErrorInterceptor, Ok_Empty_Res, Ok_Forbidden_Res, receiver} from "../../../../helpers/func";
import {encrypt} from "../../../../helpers/cryptogram";
import {ClientProxy} from "@nestjs/microservices";

@Controller('users')
export class UsersController {
  constructor(@Inject('users') private readonly usersC: ClientProxy) {
  }

  @Post('create')
  async create(@Res() response: any, @Body() data: any) {
    await ErrorInterceptor(async () => {
      const exist = await receiver(this.usersC, 'isExist', data);
      if (!exist) {
        const result = await receiver(this.usersC, 'isExist', data);
        if (result) return response.status(HttpStatus.CREATED).json(result);
        else
          return response
            .status(HttpStatus.BAD_REQUEST)
            .json({message: 'Bad request'});
      } else
        return response
          .status(HttpStatus.CONFLICT)
          .json({message: 'user already exists'});
    })
  }

  @Patch()
  async update(@Res() res: any, @Body() data: any) {
    ErrorInterceptor(async () => {
      const exist = await receiver(this.usersC, 'isExist', data);
      if (exist) {
        const hash = encrypt(data.privilege.join('-'));
        const user: any = {};
        user.USERNAME = data.username;
        user.USERPROFILE = data.profile;
        user.REQUEST_GROUP_ID = data.group;
        user.ORGANIZATION_GROUP = data.orgaGroup;
        user.USERPRIVILEGE = hash.iv + '@' + hash.content;
        const result = await receiver(this.usersC, 'update', data.id);
        Ok_Forbidden_Res(result, res)
      } else {
        return res.status(HttpStatus.BAD_REQUEST);
      }
    })
  }

  @Get('/:id')
  async getUser(@Res() res: any, @Param('id') id: any) {
    ErrorInterceptor(async () => {
      if (id) {
        const result = await receiver(this.usersC, 'getUser', {id});
        Ok_Empty_Res(result, res)
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({message: 'missing or incorrect parameters'});
      }
    })
  }

  @Get()
  async gets(@Res() res: any) {
    await ErrorInterceptor(async () => {
      const result = await receiver(this.usersC, 'gets');
      Ok_Empty_Res(result, res)
    })
  }
}