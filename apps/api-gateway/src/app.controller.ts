// app.controller.ts (Gateway)
import {Body, Controller, Get, Inject, Param, Post, Res} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {firstValueFrom} from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
  ) {
  }

  @Get('users/:id')
  async getUser(@Param('id') id: number) {
    return firstValueFrom(
      this.userClient.send({cmd: 'get_user'}, parseInt(id.toString()))
    );
  }


  @Get('get_product')
  async get_product(@Res() response: any) {
    return await firstValueFrom(this.productClient.send({cmd: 'get_product'}, ''));
  }

  @Post('users')
  async createUser(@Body() userData: any) {
    return firstValueFrom(
      this.userClient.send({cmd: 'create_user'}, userData)
    );
  }

  @Get('products/:id')
  async getProduct(@Param('id') id: number) {
    return firstValueFrom(
      this.productClient.send({cmd: 'get_product'}, parseInt(id.toString()))
    );
  }

  @Post('products')
  async createProduct(@Body() productData: any) {
    return firstValueFrom(
      this.productClient.send({cmd: 'create_product'}, productData)
    );
  }
}