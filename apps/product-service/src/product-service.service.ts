// product-service/src/product.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  private products = [];
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  // getProduct(id: number) {
  //   return this.products.find(product => product.id === id) || { message: 'Product not found' };
  // }

  createProduct(productData: any) {
    const newProduct = {
      id: this.products.length + 1,
      ...productData,
      createdAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async getProduct(id: number) {
    const product = this.products.find(product => product.id === id);
    
    if (product && product.userId) {
      // Get user information related to this product
      const user = await firstValueFrom(
        this.userClient.send({ cmd: 'get_user' }, product.userId)
      );
      
      return {
        ...product,
        user,
      };
    }
    
    return product || { message: 'Product not found' };
  }
}