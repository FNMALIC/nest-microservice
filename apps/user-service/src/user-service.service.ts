// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class UserServiceService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }

// user-service/src/user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [];

  getUser(id: number) {
    return this.users.find(user => user.id === id) || { message: 'User not found' };
  }

  createUser(userData: any) {
    const newUser = {
      id: this.users.length + 1,
      ...userData,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }
}