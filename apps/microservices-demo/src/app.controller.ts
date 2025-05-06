// app.controller.ts (Gateway)
import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
  ) {}

  @Get('users/:id')
  async getUser(@Param('id') id: number) {
    return firstValueFrom(
      this.userClient.send({ cmd: 'get_user' }, parseInt(id.toString()))
    );
  }

  @Post('users')
  async createUser(@Body() userData: any) {
    return firstValueFrom(
      this.userClient.send({ cmd: 'create_user' }, userData)
    );
  }

  @Get('products/:id')
  async getProduct(@Param('id') id: number) {
    return firstValueFrom(
      this.productClient.send({ cmd: 'get_product' }, parseInt(id.toString()))
    );
  }

  @Post('products')
  async createProduct(@Body() productData: any) {
    return firstValueFrom(
      this.productClient.send({ cmd: 'create_product' }, productData)
    );
  }
}