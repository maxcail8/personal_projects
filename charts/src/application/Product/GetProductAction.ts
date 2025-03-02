import { ProductProperties } from '../../domain/Product/Product'
import { ProductRepository } from '../../infrastructure/ProductRepository/ProductRepository'

export class GetProductAction {
  constructor(private productRepository: ProductRepository) {}

  execute(): Promise<ProductProperties[]> {
    return this.productRepository.getProducts()
  }
}
