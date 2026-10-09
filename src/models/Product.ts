import type { ProductDataResponse } from "./ProductResponse"

type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  tags: string[]
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  sku: string
  weight: number
  thumbnail: string
}

type ProductsResponse = ProductDataResponse<"productsData", "products", Product>

export type { Product }

export type { ProductsResponse }