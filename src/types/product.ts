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

export type ProductPagePublicView = PageResponse<ProductPublicView>