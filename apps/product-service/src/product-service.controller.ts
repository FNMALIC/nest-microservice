// product-service/src/product.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product-service.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'get_product' })
  getProduct(id: number) {
    return this.productService.getProduct(id);
  }
  
  @MessagePattern({ cmd: 'create_product' })
  createProduct(productData: any) {
    return this.productService.createProduct(productData);
  }
}