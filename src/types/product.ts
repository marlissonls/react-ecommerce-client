import type { PageResponse } from "./pagination"

export type ProductPublicView = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  salePrice: number | null;
  stock: number;
  featured: boolean;
  rating: number | null;
  ratingCount: number;
  categoryId: string;
  brandId: string;
}

export type ProductImageView = {
  publicId: string
  url: string
  main: boolean
  position: number
}

export type ProductManagerView = {
  id: string
  title: string
  slug: string
  barcode: string | null
  sku: string | null
  description: string
  price: number
  salePrice: number | null
  costPrice: number | null
  stock: number
  reservedStock: number
  minimumStock: number
  rating: number | null
  ratingCount: number
  active: boolean
  featured: boolean
  image: ProductImageView | null
  images?: ProductImageView[]
  categoryId: string
  brandId: string
  createdAt: string
  updatedAt: string
}

export type ProductPagePublicView = PageResponse<ProductPublicView>