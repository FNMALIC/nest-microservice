import {Controller, HttpStatus} from '@nestjs/common';
import {UsersService} from './users.service';
import {responder} from "../../../helpers/func";
import {encrypt} from "../../../helpers/cryptogram";
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class UsersController {
  constructor(private userService: UsersService) {
  }

  async create(data) {
    const exist = await this.userService.isExist(data);
    if (!exist) {
      const result = await this.userService.create(data);
      if (result) return responder(HttpStatus.CREATED, result);
      else
        return responder(HttpStatus.BAD_REQUEST)
    } else
      return responder(HttpStatus.CONFLICT, 'user already exists')
  }

  async update(data: any) {
    const exist = this.userService.isExist(data);
    if (exist) {
      const hash = encrypt(data.privilege.join('-'));
      const user: any = {};
      user.USERNAME = data.username;
      user.USERPROFILE = data.profile;
      user.REQUEST_GROUP_ID = data.group;
      user.ORGANIZATION_GROUP = data.orgaGroup;
      user.USERPRIVILEGE = hash.iv + '@' + hash.content;
      const result = await this.userService.update(user, data.id);
      if (result) {
        return responder(HttpStatus.OK, result);
      } else return responder(HttpStatus.FORBIDDEN, result);
    } else {
      return responder(HttpStatus.BAD_REQUEST);
    }
  }

  async getUser(id: any) {
    if (id) {
      const result = await this.userService.getUser({id});
      if (result) return responder(HttpStatus.OK, result);
      else return responder(HttpStatus.NO_CONTENT);
    } else {
      return responder(HttpStatus.BAD_REQUEST, 'missing or incorrect parameters')
    }
  }

  @MessagePattern({cmd: 'gets'})
  async gets() {
    const result = await this.userService.gets();
    if (result.length === 0) return responder(HttpStatus.NO_CONTENT);
    else return responder(HttpStatus.OK, result);
  }
}
