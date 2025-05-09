import {Body, Controller, Get, Inject, Param, Post, Res} from '@nestjs/common';
import {ErrorInterceptor, receiver} from "../../../../helpers/func";
import {ClientProxy} from "@nestjs/microservices";
import {ApiBody, ApiConsumes} from "@nestjs/swagger";
import {EmployeeDto} from "../dto/EmployeeDto";

@Controller('auth')
export class AuthController {
  constructor(@Inject('auth') private readonly authC: ClientProxy) {
  }

  @ApiBody({type: EmployeeDto})
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @Post('/sign-in')
  async loginStepForSendCode(@Res() res: any, @Body() body: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.authC, 'loginStepForSendCode', body)
      return res.status(result.status).json(result.data);
    })
  }

  @Post('/student/sign-in')
  async loginStepForSendCodeST(@Res() res: any, @Body() body: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.authC, 'loginStepForSendCodeST', body)
      return res.status(result.status).json(result.data);
    })
  }

  @Post('/student/sign-up')
  async signUpStudent(@Res() res: any, @Body() body: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.authC, 'signUpStudent', body)
      return res.status(result.status).json(result.data);
    })
  }

  @Post('/sign-up')
  async signUp(@Res() res: any, @Body() body: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.authC, 'signUp', body)
      return res.status(result.status).json(result.data);
    })
  }

  @Post('/email-verification')
  async verifyEmail(@Res() res: any, @Body() body: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.authC, 'verifyEmail', body)
      return res.status(result.status).json(result.data);
    })
  }

  @Post('/email-confirmation')
  async emailConfirmation(@Res() res: any, @Body() body: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.authC, 'emailConfirmation', body)
      return res.status(result.status).json(result.data);
    })
  }

  @Post('/student/email-verification')
  async StudentVerifyEmail(@Res() res: any, @Body() body: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.authC, 'StudentVerifyEmail', body)
      return res.status(result.status).json(result.data);
    })
  }

  @Post('/code-verification')
  async codeVerification(@Res() res: any, @Body() body: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.authC, 'codeVerification', body)
      return res.status(result.status).json(result.data);
    })
  }

  @Post('/student/code-verification')
  async codeVerificationStudent(@Res() res: any, @Body() body: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.authC, 'codeVerificationStudent', body)
      return res.status(result.status).json(result.data);
    })
  }

  @Get('/student/verification/:email')
  async existVerificationStudent(@Res() res: any, @Param('email') email: string) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.authC, 'existVerificationStudent', email)
      return res.status(result.status).json(result.data);
    })
  }

  @Post('/')
  async login(@Res() res: any, @Body() body: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.authC, 'login', body)
      return res.status(result.status).json(result.data);
    })
  }

  @Post('/federate')
  async signInWithFederate(@Res() res: any, @Body() body: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.authC, 'signInWithFederate', body)
      return res.status(result.status).json(result.data);
    })
  }

  @Post('/students')
  async loginStudents(@Res() res: any, @Body() body: any) {
    return await ErrorInterceptor(async () => {
      let result = await receiver(this.authC, 'loginStudents', body)
      return res.status(result.status).json(result.data);
    })
  }
}
