import { ProductProperties } from '../../domain/Product/Product'

export class ProductApi {
  // Conversione dal tipo Api al tipo Domain
  static toDomain(productResponse: ProductResponse): ProductProperties {
    const reviewsProperties: ProductProperties['reviews'] =
      productResponse.reviews.map((review) => {
        return {
          rating: review.rating,
          comment: review.comment,
          date: new Date(review.date),
          reviewerName: review.reviewerName,
          reviewerEmail: review.reviewerEmail
        }
      })

    return {
      ...productResponse,
      reviews: reviewsProperties,
      ...{
        meta: {
          createdAt: new Date(productResponse.meta.createdAt),
          updatedAt: new Date(productResponse.meta.updatedAt),
          barcode: productResponse.meta.barcode,
          qrCode: productResponse.meta.qrCode
        }
      }
    }
  }
}

export type ProductResponse = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand?: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  images: string[]
  thumbnail: string
}
