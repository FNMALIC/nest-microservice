// import { Module } from '@nestjs/common';
// import { UserServiceController } from './user-service.controller';
// import { UserServiceService } from './user-service.service';

// @Module({
//   imports: [],
//   controllers: [UserServiceController],
//   providers: [UserServiceService],
// })
// export class UserServiceModule {}

// user-service/src/user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user-service.controller';
import { UserService } from './user-service.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}