// user-service/src/user.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user-service.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_user' })
  getUser(id: number) {
    console.log(0)
    return this.userService.getUser(id);
  }
  
  @MessagePattern({ cmd: 'create_user' })
  createUser(userData: any) {
    console.log(0)
    return this.userService.createUser(userData);
  }
}
