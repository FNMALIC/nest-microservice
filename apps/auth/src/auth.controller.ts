import {Body, Controller, Get, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ErrorInterceptor, responder} from "../../../helpers/func";
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @MessagePattern({cmd:'loginStepForSendCode'})
  async loginStepForSendCode(body) {
    return await ErrorInterceptor(async () => {
      const result = await this.authService.loginStepForSendCode(body);
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'Invalid credentials or unverified email',
        });
    })
  }

  @MessagePattern({cmd:'loginStepForSendCodeST'})
  async loginStepForSendCodeST(body) {
    return await ErrorInterceptor(async () => {
      const result =
        await this.authService.loginStepForSendCodeStudent(body);
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'Invalid credentials or unverified email',
        });
    })
  }

  @MessagePattern({cmd:'signUpStudent'})
  async signUpStudent(body) {
    return await ErrorInterceptor(async () => {
      const result = await this.authService.signUpStudent(body);
      return result
        ? responder(HttpStatus.CREATED, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'an error occurred, please try again',
        });
    })
  }

  @MessagePattern({cmd:'signUp'})
  async signUp(body) {
    return await ErrorInterceptor(async () => {
      const result: any = await this.authService.signUp(body);
      if (result) return responder(HttpStatus.CREATED, result);
      else return responder(HttpStatus.BAD_REQUEST);
    })
  }

  @MessagePattern({cmd:'verifyEmail'})
  async verifyEmail(body) {
    return await ErrorInterceptor(async () => {
      const result = await this.authService.verifyEmail(body);
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'email verification failed',
        });
    })
  }

  @MessagePattern({cmd:'emailConfirmation'})
  async emailConfirmation(body) {
    return await ErrorInterceptor(async () => {
      const result = await this.authService.emailConfirmation(body);
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'email confirmation failed',
        });
    })
  }

  @MessagePattern({cmd:'StudentVerifyEmail'})
  async StudentVerifyEmail(body) {
    return await ErrorInterceptor(async () => {
      const result = await this.authService.StudentVerifyEmail(body);
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'email verification failed',
        });
    })
  }

  @MessagePattern({cmd:'codeVerification'})
  async codeVerification(body) {
    return await ErrorInterceptor(async () => {
      const result = await this.authService.codeVerification(body);
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'email confirmation failed',
        });
    })
  }

  @MessagePattern({cmd:'codeVerificationStudent'})
  async codeVerificationStudent(body) {
    return await ErrorInterceptor(async () => {
      const result = await this.authService.codeVerificationStudent(body);
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'email confirmation failed',
        });
    })
  }

  @MessagePattern({cmd:'existVerificationStudent'})
  async existVerificationStudent(email) {
    return await ErrorInterceptor(async () => {
      const result = await this.authService.existVerificationStudent(email);
      return responder(HttpStatus.OK, result);
    })
  }

  @MessagePattern({cmd:'login'})
  async login(body) {
    return await ErrorInterceptor(async () => {
      const result = await this.authService.login(body);
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'login failed please try again',
        });
    })
  }

  @MessagePattern({cmd:'signInWithFederate'})
  async signInWithFederate(body) {
    return await ErrorInterceptor(async () => {
      const result = await this.authService.signInWithFederate(body);
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'bad request',
        });
    })
  }

  @MessagePattern({cmd:'loginStudents'})
  async loginStudents(body) {
    return await ErrorInterceptor(async () => {
      const result = await this.authService.loginStudents(body);
      return result
        ? responder(HttpStatus.OK, result)
        : responder(HttpStatus.BAD_REQUEST, {
          message: 'bad request',
        });
    })
  }
}
