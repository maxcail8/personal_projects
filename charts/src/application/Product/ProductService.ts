import { ProductProperties } from '../../domain/Product/Product'
import { ProductRepository } from '../../infrastructure/ProductRepository/ProductRepository'
import { GetProductAction } from './GetProductAction'

export class ProductService {
  private getProductAction: GetProductAction

  constructor() {
    const productRepository = new ProductRepository()
    this.getProductAction = new GetProductAction(productRepository)
  }

  // Get Products
  getProducts(): Promise<ProductProperties[]> {
    return this.getProductAction.execute()
  }
}
