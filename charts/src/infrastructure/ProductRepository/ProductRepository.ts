import { ProductProperties } from '../../domain/Product/Product'
import { getDummyProducts } from '../../utilities/HttpClient/HttpClient'
import { ProductApi, ProductResponse } from '../ProductApi/ProductApi'
import { DummyResponse } from '../types'

export class ProductRepository {
  // Get Products
  async getProducts(): Promise<ProductProperties[]> {
    let response: DummyResponse
    let productsApi: ProductResponse[] = []

    await getDummyProducts().then((axiosResponse) => {
      response = axiosResponse.data
      productsApi = response.products
    })

    return productsApi.map((productApi) => ProductApi.toDomain(productApi))
  }
}
