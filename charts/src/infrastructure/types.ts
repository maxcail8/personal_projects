import { ProductResponse } from './ProductApi/ProductApi'

export type DummyResponse = {
  products: ProductResponse[]
  total: number
  skip: number
  limit: number
}
